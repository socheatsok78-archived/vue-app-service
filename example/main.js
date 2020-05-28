import Application, { ServiceRegistry } from '../dist'

const PostService = new ServiceRegistry({
    name: 'posts',
    config: {
        baseURL: '/posts'
    },
    methods: {
        async get({$axios}, id = '') {
            const { data } = await $axios.get(`${id}`)
            return data
        }
    }
})

const CommentService = new ServiceRegistry({
    name: 'comments',
    config: {
        baseURL: '/comments'
    },
    methods: {
        async get({ $axios }, id = '') {
            const { data } = await $axios.get(`${id}`)
            return data
        }
    }
})

const $app = new Application({
    config: {
        baseURL: 'https://jsonplaceholder.typicode.com'
    }
})

$app.$service.on('register', function({ $axios, $config }) {
    // Add a request interceptor
    $axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    $axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
})

$app.$service.on('unregister', ({ $service }) => {
    console.log($service)
})

a()

$app.$service.register(PostService)
$app.$service.register(CommentService)

$app.$service.posts.get(1) //?

$app.$service.unregister('posts')
