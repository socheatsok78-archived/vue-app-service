# Vue.js App Service Manager \w axios

> coming soon...

### Usage

Create new Application instance
```js
import Application from 'vue-app-service'

/**
 * Create new AppContainer
 */
const $app = new Application()
```

Create a new ServiceRegistry
```js
import { ServiceRegistry } from 'vue-app-service'

const AuthService = new ServiceRegistry({
  name: 'auth',
  description: 'Authentication Service',
  config: {
    baseURL: '/auth/api/v1'
  },
  methods: {
    async login ({ $axios }, { username, password }) {
      try {
        const { data: user } = await $axios
          .post('/login', { username, password })

        return user
      } catch (error) {
        console.log(error)
      }
    },
    logout ({ $axios }) {
      console.log('Logged out!', { $axios })
    }
  }
})
```

Register the Service to the application
```js
$app.$service.register(AuthService)
```

Now you can call `auth` service with the following:
```js
$app.$service.auth.login({username: 'admin', password: 'admin'})
```

**Configure the registered services**

Once the service has successfully registered the `register` event will be fired.

```js
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
```

**To unregister a service**
```js
$app.$service.unregister('auth')
```

Once the service has been removed, it will emit `unregister` event.

```js
$app.$service.on('unregister', ({ $service }) => {
    console.log($service)
})
```

**Update application config**

You can create new instance with the configuration in place

```js
const $app = new Application({
    name: 'Example Application',
    config: {
        baseURL: 'https://localhost:8080/api'
    }
})
```

or you can update the configuration later on...

```js
$app.$config.update({
    baseURL: 'https://localhost:8080/api'
})
```

## License
License under [MIT](LICENSE)
