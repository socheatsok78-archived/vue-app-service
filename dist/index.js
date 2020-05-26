"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ServiceContainer", {
  enumerable: true,
  get: function get() {
    return _ServiceContainer.default;
  }
});
Object.defineProperty(exports, "ServiceRegistry", {
  enumerable: true,
  get: function get() {
    return _ServiceRegistry.default;
  }
});
exports.default = void 0;

var _Application = _interopRequireDefault(require("./core/Application"));

var _ServiceContainer = _interopRequireDefault(require("./core/ServiceContainer"));

var _ServiceRegistry = _interopRequireDefault(require("./core/foundations/ServiceRegistry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Application.default;
exports.default = _default;