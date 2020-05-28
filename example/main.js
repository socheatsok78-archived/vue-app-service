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
        baseURL: 'https://example.com'
    }
})

$app.$service.on('unregister', ({ $service }) => {
    console.log($service)
})

$app.$service.register(PostService)
$app.$service.register(CommentService)

$app.config.update({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

console.log($app.config)

$app.$service.posts.get(1) //?
