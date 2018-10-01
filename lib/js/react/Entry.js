"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = function (_React$Component) {
	_inherits(Entry, _React$Component);

	function Entry() {
		_classCallCheck(this, Entry);

		return _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).apply(this, arguments));
	}

	_createClass(Entry, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "entry-modal", className: "active" },
				React.createElement(
					"div",
					{ id: "entry-content", className: "valign-wrapper" },
					React.createElement(
						"h1",
						{ onClick: this.props.onClear },
						React.createElement(
							"p",
							{ id: "vice", className: "no-select" },
							"vice"
						),
						React.createElement(
							"p",
							{ id: "versa", className: "no-select" },
							"versa"
						)
					)
				)
			);
		}
	}]);

	return Entry;
}(React.Component);

exports.default = Entry;