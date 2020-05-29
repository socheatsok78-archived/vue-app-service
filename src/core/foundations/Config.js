import Bus from '@condenast/quick-bus'
import { warn } from '../utils';
import { AxiosRequestConfig } from 'axios'

const EventBus = new Bus();

export default class Config {
    #cachedConfig = {};

    /**
     * Create a new Config instance
     * @param {AxiosRequestConfig} config
     */
    constructor(config = {}) {
        this.update(config, false)
    }

    /**
     * Update config
     * @param {AxiosRequestConfig} config
     */
    update(config, fireEvent = true) {
        Object.assign(this.#cachedConfig, config)

        this._defineProperty(this.#cachedConfig)

        if (fireEvent) {
            this._emitUpdateEvent(config)
        }
    }

    /**
     * Sync a remote configuration file
     * @param {string} url Remote config URL
     */
    async sync(url) {
        try {
            const res = await fetch(url)
            const config = await res.json()

            this._emitSyncEvent(config)

            this.update(config)
        } catch (error) {
            warn(`Unable synchronize configurations from: ${url}`)
        }
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
     * Define config property
     * @param {AxiosRequestConfig} config
     */
    _defineProperty(config) {
        Object.keys(config).forEach(token => {
            Object.defineProperty(this, token, {
                enumerable: true,
                configurable: true,
                get() {
                    return config[token]
                },
                set(value) {
                    config[token] = value
                    return
                }
            })
        })
    }

    /**
     * Emit update event
     * @param {AxiosRequestConfig} config
     */
    _emitUpdateEvent(config) {
        EventBus.emit('update', config)
    }

    /**
     * Emit sync event
     * @param {AxiosRequestConfig} config
     */
    _emitSyncEvent(config) {
        EventBus.emit('sync', config)
    }
}
