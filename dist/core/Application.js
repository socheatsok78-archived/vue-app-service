"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = require("axios");

var _ServiceContainer = _interopRequireDefault(require("./ServiceContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Application {
  /**
   * @type {string} Application name
   */

  /**
   * @type {string} Application description
   */

  /**
   * @type {ServiceContainer} ServiceContainer
   */

  /**
   * @type {AxiosRequestConfig}
   */

  /**
   * Create new Application instance
   * @param {ApplicationOptions} options
   */
  constructor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _service.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "config", {});

    this.name = options.name || "__Application__".concat(Date.now());
    this.description = options.description || '';
    this.config = options.config || {};

    this._bootstrapServiceContainer();
  }
  /**
   * @returns {ServiceContainer} ServiceContainer
   */


  get $service() {
    return _classPrivateFieldGet(this, _service);
  }
  /**
   * Bootstrap Application's ServiceContainer
   */


  _bootstrapServiceContainer() {
    _classPrivateFieldSet(this, _service, new _ServiceContainer.default(this));
  }

}
/**
 * @typedef ApplicationOptions
 * @property {string} name Application name
 * @property {string} description Application description
 * @property {AxiosRequestConfig} config Application gateway options
 */


exports.default = Application;

var _service = new WeakMap();