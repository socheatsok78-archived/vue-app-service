import { AxiosRequestConfig } from 'axios'
import ServiceContainer from "./ServiceContainer";

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
     * @type {AxiosRequestConfig}
     */
    config = {};

    /**
     * Create new Application instance
     * @param {ApplicationOptions} options
     */
    constructor(options = {}) {
        this.name = options.name || `__Application__${Date.now()}`;
        this.description = options.description || '';
        this.config = options.config || {}

        this._bootstrapServiceContainer();
    }

    /**
     * @returns {ServiceContainer} ServiceContainer
     */
    get $service () {
        return this.#service;
    }

    /**
     * Bootstrap Application's ServiceContainer
     */
    _bootstrapServiceContainer() {
        this.#service = new ServiceContainer(this);
    }
}

/**
 * @typedef ApplicationOptions
 * @property {string} name Application name
 * @property {string} description Application description
 * @property {AxiosRequestConfig} config Application gateway options
 */
