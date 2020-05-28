import { AxiosRequestConfig } from 'axios'
import { warn } from '../utils';

export default class Config {
    #cachedConfig = {};

    /**
     * Create a new Config instance
     * @param {AxiosRequestConfig} config
     */
    constructor(config = {}) {
        this.update(config)
    }

    /**
     * Update config
     * @param {AxiosRequestConfig} config
     */
    update(config) {
        Object.assign(this.#cachedConfig, config)

        this._defineProperty(this.#cachedConfig)
    }

    /**
     * Sync a remote configuration file
     * @param {string} url Remote config URL
     */
    async sync(url) {
        try {
            const res = await fetch(url)
            const config = await res.json()

            this.update(config)
        } catch (error) {
            warn(`Unable synchronize configurations from: ${url}`)
        }
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
}
