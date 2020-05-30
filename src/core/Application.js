import Bus from '@condenast/quick-bus'
import ServiceContainer from "./ServiceContainer";
import Config from './foundations/Config';

import { AxiosRequestConfig } from 'axios'

const EventBus = new Bus();

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
        this._emitConstructorReadyEvent()
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
    get $config() {
        return this.#config;
    }

    /**
     * Register an event listener
     * @param  {...any} args
     */
    on(...args) {
        return EventBus.on(...args)
    }

    /**
     * Register an event listener
     * @static
     * @param  {...any} args
     */
    static on(...args) {
        return EventBus.on(...args)
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

    /**
     * Emit ready event
     */
    _emitReadyEvent() {
        EventBus.emit('ready', this)
    }

    /**
     * Emit constructor ready event
     */
    _emitConstructorReadyEvent() {
        setTimeout(this._emitReadyEvent.bind(this));
    }
}

/**
 * @typedef ApplicationOptions
 * @property {string} name Application name
 * @property {string} description Application description
 * @property {AxiosRequestConfig} config Application gateway options
 */
