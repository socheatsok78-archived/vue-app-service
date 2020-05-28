"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = void 0;

function noop() {}

var warn = noop;
exports.warn = warn;

if (process.env.NODE_ENV !== 'production') {
  exports.warn = warn = msg => {
    console.error("[warn]: ".concat(msg));
  };
}