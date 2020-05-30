import VueConstructor from "vue";

export default class VueAppServicePlugin {
    static installed = false

    /**
     * Install Vue App Service Plugin
     * @param {VueConstructor} Vue
     */
    static install(Vue) {
        if (this.installed) return
        this.installed = true

        Object.defineProperty(Vue.prototype, '$app', {
            enumerable: true,
            configurable: true,
            get() {
                return this.$root.$options.$app
            }
        })

        Object.defineProperty(Vue.prototype, '$service', {
            enumerable: true,
            configurable: true,
            get() {
                return this.$root.$options.$app.$service
            }
        })
    }
}
