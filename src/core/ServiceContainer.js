import axios from 'axios'
import Bus from '@condenast/quick-bus'

import Application from './Application'
import ServiceRegistry from './foundations/ServiceRegistry'

const ServiceBus = new Bus();

export default class ServiceContainer {
    /**
     * @type {Application}
     */
    #app;

    /**
     * Registered service
     * @type {Object.<string, ServiceRegistry>}
     */
    #services = {};

    /**
     * Create new ServiceContainer instance
     * @param {Application} app
     * @returns {ServiceContainer} ServiceContainer
     */
    constructor(app) {
        this.#app = app;
    }

    /**
     * Register a new service
     * @param {ServiceRegistry} service ServiceRegistry Instance
     */
    register(service) {
        if (!(service instanceof ServiceRegistry)) {
            this._throwServiceRegistryException()
        }

        this._registerService(service);
    }

    /**
     * Unregister a service
     * @param {string} name Service name
     */
    unregister(name) {
        if (!(name in this.#services)) {
            this._throwServiceNotExistException(name);
        }

        const service = this.#services[name]

        delete this.#services[name];
        delete this[name];

        this._emitServiceUnregisterEvent(service)
    }

    /**
     * Register an event listener
     * @param  {...any} args
     */
    on(...args) {
        return ServiceBus.on(...args)
    }

    /**
     * Complete register a new ServiceRegistry
     * @param {ServiceRegistry} service ServiceRegistry Instance
     */
    _registerService(service) {
        if (service.name in this.#services) {
            this._throwServiceExistException(service.name);
        }

        this.#services[service.name] = service;

        Object.defineProperty(this, service.name, {
            enumerable: true,
            configurable: true,
            value: this._registerServiceMethods(service)
        })

        this._emitServiceRegisterEvent(service)
    }

    /**
     * Register service methods
     *
     * @param {ServiceRegistry} service Service Registry Instance
     */
    _registerServiceMethods(service) {
        const serviceMethods = {}
        const tokens = Object.keys(service.methods)
        const _requestWrapper = this._requestWrapper.bind(this)

        tokens.forEach(token => {
            serviceMethods[token] = function (...args) {
                return service.methods[token](
                    {
                        $axios: _requestWrapper(service.$http),
                        $config: service.$config
                    },
                    ...args
                )
            }
        })

        return serviceMethods;
    }

    /**
     * Wrap Request Instance
     * @param {axios} http
     */
    _requestWrapper(http) {
        http.interceptors.request.use(
            this._resolveRequestConfig.bind(this),
            this._rejectRequestConfig.bind(this)
        )

        return http
    }

    /**
     * Resolve request interceptor
     * @param {any} config
     */
    _resolveRequestConfig(config) {
        const appConfig = this.#app.config;
        const gatewayURL = new URL(appConfig.baseURL)

        gatewayURL.pathname = config.baseURL
        config.baseURL = `${gatewayURL}`

        return config
    }

    /**
     * Rejest request interceptor
     * @param {any} error
     */
    _rejectRequestConfig(error) {
        return Promise.reject(error)
    }

    /**
     * Emit service registered event
     * @param {ServiceRegistry} service Service Registry Instance
     */
    _emitServiceRegisterEvent(service) {
        ServiceBus.emit('register', {
            $axios: service.$http,
            $config: service.$config
        })
    }

    /**
     * Emit service unregistered event
     * @param {ServiceRegistry} service Service Registry Instance
     */
    _emitServiceUnregisterEvent(service) {
        ServiceBus.emit('unregister', {
            $service: service
        })
    }

    /**
     * Throw Service muse be ServiceRegistry exception
     * @throws {Error}
     */
    _throwServiceRegistryException() {
        throw new Error("Service must be a Service instance.")
    }

    /**
     * Throw Service already registered exception
     * @param {string} name Service name
     * @throws {Error}
     */
    _throwServiceExistException(name) {
        throw new Error(`Service: '${name}' already been registered.`)
    }

    /**
     * Throw Service not exist exception
     * @param {string} name Service name
     * @throws {Error}
     */
    _throwServiceNotExistException(name) {
        throw new Error(`Service: '${name}' has not been registered.`)
    }
}
