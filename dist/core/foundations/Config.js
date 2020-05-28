"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = require("axios");

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

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

    this.update(config);
  }
  /**
   * Update config
   * @param {AxiosRequestConfig} config
   */


  update(config) {
    Object.assign(_classPrivateFieldGet(this, _cachedConfig), config);

    this._defineProperty(_classPrivateFieldGet(this, _cachedConfig));
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

        _this.update(config);
      } catch (error) {
        (0, _utils.warn)("Unable synchronize configurations from: ".concat(url));
      }
    })();
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

}

exports.default = Config;

var _cachedConfig = new WeakMap();