function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { settings } from 'carbon-components';
var prefix = settings.prefix;

var RadioButtonSkeleton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RadioButtonSkeleton, _React$Component);

  function RadioButtonSkeleton() {
    _classCallCheck(this, RadioButtonSkeleton);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioButtonSkeleton).apply(this, arguments));
  }

  _createClass(RadioButtonSkeleton, [{
    key: "render",
    value: function render() {
      var id = this.props.id;
      return React.createElement("div", {
        className: "radioButtonWrapper"
      }, React.createElement("div", {
        className: "".concat(prefix, "--radio-button ").concat(prefix, "--skeleton")
      }),
      /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
      React.createElement("label", {
        className: "".concat(prefix, "--radio-button__label ").concat(prefix, "--skeleton"),
        htmlFor: id
      }));
    }
  }]);

  return RadioButtonSkeleton;
}(React.Component);

export { RadioButtonSkeleton as default };