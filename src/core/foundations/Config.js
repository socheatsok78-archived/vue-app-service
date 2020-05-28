import { AxiosRequestConfig } from 'axios'

export default class Config {
    #cachedConfig = {};

    /**
     * Create a new Config instance
     * @param {AxiosRequestConfig} config
     */
    constructor(config = {}) {
        this.update(config)
    }

    get config() {
        return this.#cachedConfig
    }

    /**
     * Update config
     * @param {AxiosRequestConfig} config
     */
    update(config) {
        Object.keys(config).forEach(token => {
            Object.defineProperty(this, token, {
                enumerable: true,
                configurable: true,
                get () {
                    return config[token]
                },
                set (value) {
                    config[token] = value
                    return
                }
            })
        })

    }
}
