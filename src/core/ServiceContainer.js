import Bus from '@condenast/quick-bus'

import Application from './Application'
import ServiceRegistry from './foundations/ServiceRegistry'

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

        const service = this.#services[name];

        delete this.#services[name];
        delete this[name];

        return service;
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
    }

    /**
     * Register service methods
     *
     * @param {ServiceRegistry} service Service Registry Instance
     */
    _registerServiceMethods(service) {
        const serviceMethods = {}
        const tokens = Object.keys(service.methods)

        tokens.forEach(token => {
            serviceMethods[token] = function (...args) {
                return service.methods[token](
                    {
                        $axios: service.$http,
                        $config: service.$config
                    },
                    ...args
                )
            }
        })

        return serviceMethods;
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
