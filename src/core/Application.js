import { AxiosRequestConfig } from 'axios'
import ServiceContainer from "./ServiceContainer";
import Config from './foundations/Config';

export default class Application {
    /**
     * @type {string} Application name
     */
    name;

    /**
     * @type {string} Application description
     */
    description;

    /**
     * @type {ServiceContainer} ServiceContainer
     */
    #service;

    /**
     * @type {Config}
     */
    #config;

    /**
     * Create new Application instance
     * @param {ApplicationOptions} options
     */
    constructor(options = {}) {
        this.name = options.name || `__Application__${Date.now()}`;
        this.description = options.description || '';

        this._bootstrapConfig(options.config || {});
        this._bootstrapServiceContainer();
    }

    /**
     * @returns {ServiceContainer} ServiceContainer
     */
    get $service () {
        return this.#service;
    }

    /**
     * @returns {Config}
     */
    get config() {
        return this.#config;
    }

    /**
     * Bootstrap Application's ServiceContainer
     */
    _bootstrapServiceContainer(instance = this) {
        this.#service = new ServiceContainer(instance);
    }

    /**
     * Bootstrap Application's Config
     * @param {AxiosRequestConfig} config
     */
    _bootstrapConfig(config) {
        this.#config = new Config(config)
    }
}

/**
 * @typedef ApplicationOptions
 * @property {string} name Application name
 * @property {string} description Application description
 * @property {AxiosRequestConfig} config Application gateway options
 */
