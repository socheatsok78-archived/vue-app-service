"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _quickBus = _interopRequireDefault(require("@condenast/quick-bus"));

var _utils = require("../utils");

var _axios = require("axios");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var EventBus = new _quickBus.default();

class Config {
  /**
   * Create a new Config instance
   * @param {AxiosRequestConfig} config
   */
  constructor() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _cachedConfig.set(this, {
      writable: true,
      value: {}
    });

    this.update(config, false);
  }
  /**
   * Update config
   * @param {AxiosRequestConfig} config
   */


  update(config) {
    var fireEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    Object.assign(_classPrivateFieldGet(this, _cachedConfig), config);

    this._defineProperty(_classPrivateFieldGet(this, _cachedConfig));

    if (fireEvent) {
      this._emitUpdateEvent(config);
    }
  }
  /**
   * Sync a remote configuration file
   * @param {string} url Remote config URL
   */


  sync(url) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        var res = yield fetch(url);
        var config = yield res.json();

        _this._emitSyncEvent(config);

        _this.update(config);
      } catch (error) {
        (0, _utils.warn)("Unable synchronize configurations from: ".concat(url));
      }
    })();
  }
  /**
   * Register an event listener
   * @param  {...any} args
   */


  on() {
    return EventBus.on(...arguments);
  }
  /**
   * Register an event listener
   * @static
   * @param  {...any} args
   */


  static on() {
    return EventBus.on(...arguments);
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
          return config[token];
        },

        set(value) {
          config[token] = value;
          return;
        }

      });
    });
  }
  /**
   * Emit update event
   * @param {AxiosRequestConfig} config
   */


  _emitUpdateEvent(config) {
    EventBus.emit('update', config);
  }
  /**
   * Emit sync event
   * @param {AxiosRequestConfig} config
   */


  _emitSyncEvent(config) {
    EventBus.emit('sync', config);
  }

}

exports.default = Config;

var _cachedConfig = new WeakMap();