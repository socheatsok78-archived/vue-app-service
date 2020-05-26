import axios, { AxiosRequestConfig } from 'axios'

export default class ServiceRegistry {
    /**
     * @type {string} Service name
     */
    name;

    /**
     * @type {string} Service description
     */
    description;

    /**
     * @type {axios} Request instance
     */
    #http;

    /**
     * @type {AxiosRequestConfig} Request config
     */
    #config;

    /**
     * @type {Object.<string, ServiceMethod>} Service methods
     */
    methods = {};

    /**
     * Create a new ServiceRegistry instance
     * @param {ServiceRegistryOptions} service
     * @returns {ServiceRegistry} ServiceRegistry
     */
    constructor(service) {
        this.name = service.name || `__Service__${Date.now()}`
        this.description = service.description || ''

        this._createHttpInstance(service.config);
        this._bootstrapMethods(service.methods);
    }

    /**
     * @returns {axios} Request instance
     */
    get $http () {
        return this.#http;
    }

    /**
     * @returns {AxiosRequestConfig} Request config
     */
    get $config () {
        return this.#config;
    }

    /**
     * Cache config
     * @param {AxiosRequestConfig config
     */
    _cacheConfig(config) {
        this.#config = config;
    }

    /**
     * Create new http instance
     * @param {AxiosRequestConfig} config
     */
    _createHttpInstance(config) {
        this.#http = axios.create(config);
        this._cacheConfig(config);
    }

    /**
     * Update http instance config
     * @param {AxiosRequestConfig} config
     */
    _updateHttpConfig(config) {
        Object.assign(this.#http.defaults, config);
    }

    /**
     * Bootstrap service methods
     * @param {Object.<string, ServiceMethod>} methods
     */
    _bootstrapMethods(methods) {
        Object.assign(this.methods, methods);
    }
}

/**
 * @typedef ServiceRegistryOptions
 * @property {string} name Service name
 * @property {string} description Service description
 * @property {AxiosRequestConfig} config Request config
 * @property {Object.<string, ServiceMethod>} methods Service methods
 */

/**
 * @callback ServiceMethod
 * @param {ServiceMethodOptions} options
 * @param {<T>T} payload
 */

/**
 * @typedef ServiceMethodOptions
 * @property {axios} $axios
 * @property {Object.<string, any>} $config
 */
