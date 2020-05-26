import { VueConstructor } from "vue/types";

export default class VueAppServicePlugin {
    /**
     * Install Vue App Service Plugin
     * @param {VueConstructor} Vue
     */
    static install(Vue) {
        Vue.mixin({
            computed: {
                $app() {
                    return this.$root.$options.$app
                },
                $service() {
                    return this.$app.$service
                }
            }
        })
    }
}
