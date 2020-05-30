"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VueAppServicePlugin {
  /**
   * Install Vue App Service Plugin
   * @param {VueConstructor} Vue
   */
  static install(Vue) {
    if (this.installed) return;
    this.installed = true;
    Object.defineProperty(Vue.prototype, '$app', {
      enumerable: true,
      configurable: true,

      get() {
        return this.$root.$options.$app;
      }

    });
    Object.defineProperty(Vue.prototype, '$service', {
      enumerable: true,
      configurable: true,

      get() {
        return this.$root.$options.$app.$service;
      }

    });
  }

}

exports.default = VueAppServicePlugin;

_defineProperty(VueAppServicePlugin, "installed", false);