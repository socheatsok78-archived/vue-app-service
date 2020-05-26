"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("vue/types");

class VueAppServicePlugin {
  /**
   * Install Vue App Service Plugin
   * @param {VueConstructor} Vue
   */
  static install(Vue) {
    Vue.mixin({
      computed: {
        $app() {
          return this.$root.$options.$app;
        },

        $service() {
          return this.$app.$service;
        }

      }
    });
  }

}

exports.default = VueAppServicePlugin;