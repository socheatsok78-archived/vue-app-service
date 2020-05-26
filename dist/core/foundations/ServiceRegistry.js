"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireWildcard(require("axios"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class ServiceRegistry {
  /**
   * @type {string} Service name
   */

  /**
   * @type {string} Service description
   */

  /**
   * @type {axios} Request instance
   */

  /**
   * @type {AxiosRequestConfig} Request config
   */

  /**
   * @type {Object.<string, ServiceMethod>} Service methods
   */

  /**
   * Create a new ServiceRegistry instance
   * @param {ServiceRegistryOptions} service
   * @returns {ServiceRegistry} ServiceRegistry
   */
  constructor(service) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _http.set(this, {
      writable: true,
      value: void 0
    });

    _config.set(this, {
      writable: true,
      value: {}
    });

    _defineProperty(this, "methods", {});

    this.name = service.name || "__Service__".concat(Date.now());
    this.description = service.description || '';

    this._createHttpInstance(service.config || {});

    this._bootstrapMethods(service.methods || {});
  }
  /**
   * @returns {axios} Request instance
   */


  get $http() {
    return _classPrivateFieldGet(this, _http);
  }
  /**
   * @returns {AxiosRequestConfig} Request config
   */


  get $config() {
    return _classPrivateFieldGet(this, _config);
  }
  /**
   * Cache config
   * @param {AxiosRequestConfig config
   */


  _cacheConfig(config) {
    _classPrivateFieldSet(this, _config, config);
  }
  /**
   * Create new http instance
   * @param {AxiosRequestConfig} config
   */


  _createHttpInstance(config) {
    _classPrivateFieldSet(this, _http, _axios.default.create(config));

    this._cacheConfig(config);
  }
  /**
   * Update http instance config
   * @param {AxiosRequestConfig} config
   */


  _updateHttpConfig(config) {
    Object.assign(_classPrivateFieldGet(this, _http).defaults, config);
  }
  /**
   * Bootstrap service methods
   * @param {Object.<string, ServiceMethod>} methods
   */


  _bootstrapMethods(methods) {
    Object.assign(this.methods, methods);
  }

}
/**
 * @typedef ServiceRegistryOptions
 * @property {string} name Service name
 * @property {string} description Service description
 * @property {AxiosRequestConfig} config Request config
 * @property {Object.<string, ServiceMethod>} methods Service methods
 */

/**
 * @callback ServiceMethod
 * @param {ServiceMethodOptions} options
 * @param {<T>T} payload
 */

/**
 * @typedef ServiceMethodOptions
 * @property {axios} $axios
 * @property {Object.<string, any>} $config
 */


exports.default = ServiceRegistry;

var _http = new WeakMap();

var _config = new WeakMap();