# Vue.js API Gateway Manager \w axios

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
          .post('/auth/api/v1/login', { username, password })

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

**To unregister a service**
```js
$app.$service.unregister('auth')
```
