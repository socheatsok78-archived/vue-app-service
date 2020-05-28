"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _quickBus = _interopRequireDefault(require("@condenast/quick-bus"));

var _Application = _interopRequireDefault(require("./Application"));

var _ServiceRegistry = _interopRequireDefault(require("./foundations/ServiceRegistry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var ServiceBus = new _quickBus.default();
var URL_MATCH_PATTERN = /(https?:\/{2})?\b((?=[a-z0-9-]{1,63}\.)[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/;

class ServiceContainer {
  /**
   * @type {Application}
   */

  /**
   * Registered service
   * @type {Object.<string, ServiceRegistry>}
   */

  /**
   * Create new ServiceContainer instance
   * @param {Application} app
   * @returns {ServiceContainer} ServiceContainer
   */
  constructor(app) {
    _app.set(this, {
      writable: true,
      value: void 0
    });

    _services.set(this, {
      writable: true,
      value: {}
    });

    _classPrivateFieldSet(this, _app, app);
  }
  /**
   * Register a new service
   * @param {ServiceRegistry} service ServiceRegistry Instance
   */


  register(service) {
    if (!(service instanceof _ServiceRegistry.default)) {
      this._throwServiceRegistryException();
    }

    this._registerService(service);
  }
  /**
   * Unregister a service
   * @param {string} name Service name
   */


  unregister(name) {
    if (!(name in _classPrivateFieldGet(this, _services))) {
      this._throwServiceNotExistException(name);
    }

    var service = _classPrivateFieldGet(this, _services)[name];

    delete _classPrivateFieldGet(this, _services)[name];
    delete this[name];

    this._emitServiceUnregisterEvent(service);
  }
  /**
   * Register an event listener
   * @param  {...any} args
   */


  on() {
    return ServiceBus.on(...arguments);
  }
  /**
   * Complete register a new ServiceRegistry
   * @param {ServiceRegistry} service ServiceRegistry Instance
   */


  _registerService(service) {
    if (service.name in _classPrivateFieldGet(this, _services)) {
      this._throwServiceExistException(service.name);
    }

    _classPrivateFieldGet(this, _services)[service.name] = service;
    Object.defineProperty(this, service.name, {
      enumerable: true,
      configurable: true,
      value: this._registerServiceMethods(service)
    });

    this._emitServiceRegisterEvent(service);
  }
  /**
   * Register service methods
   *
   * @param {ServiceRegistry} service Service Registry Instance
   */


  _registerServiceMethods(service) {
    var serviceMethods = {};
    var tokens = Object.keys(service.methods);

    var _requestWrapper = this._requestWrapper.bind(this);

    tokens.forEach(token => {
      serviceMethods[token] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return service.methods[token]({
          $axios: _requestWrapper(service.$http),
          $config: service.$config
        }, ...args);
      };
    });
    return serviceMethods;
  }
  /**
   * Wrap Request Instance
   * @param {axios} http
   */


  _requestWrapper(http) {
    http.interceptors.request.use(this._resolveRequestConfig.bind(this), this._rejectRequestConfig.bind(this));
    return http;
  }
  /**
   * Resolve request interceptor
   * @param {any} config
   */


  _resolveRequestConfig(config) {
    var appConfig = _classPrivateFieldGet(this, _app).$config;

    if (!!appConfig.baseURL) {
      var gatewayURL = new URL(config.baseURL || '', appConfig.baseURL);
      config.baseURL = "".concat(gatewayURL);
    }

    return config;
  }
  /**
   * Rejest request interceptor
   * @param {any} error
   */


  _rejectRequestConfig(error) {
    return Promise.reject(error);
  }
  /**
   * Emit service registered event
   * @param {ServiceRegistry} service Service Registry Instance
   */


  _emitServiceRegisterEvent(service) {
    ServiceBus.emit('register', {
      $axios: service.$http,
      $config: service.$config
    });
  }
  /**
   * Emit service unregistered event
   * @param {ServiceRegistry} service Service Registry Instance
   */


  _emitServiceUnregisterEvent(service) {
    ServiceBus.emit('unregister', {
      $service: service
    });
  }
  /**
   * Throw Service muse be ServiceRegistry exception
   * @throws {Error}
   */


  _throwServiceRegistryException() {
    throw new Error("Service must be a Service instance.");
  }
  /**
   * Throw Service already registered exception
   * @param {string} name Service name
   * @throws {Error}
   */


  _throwServiceExistException(name) {
    throw new Error("Service: '".concat(name, "' already been registered."));
  }
  /**
   * Throw Service not exist exception
   * @param {string} name Service name
   * @throws {Error}
   */


  _throwServiceNotExistException(name) {
    throw new Error("Service: '".concat(name, "' has not been registered."));
  }

}

exports.default = ServiceContainer;

var _app = new WeakMap();

var _services = new WeakMap();