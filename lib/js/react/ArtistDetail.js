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

var Artists = function (_React$Component) {
	_inherits(Artists, _React$Component);

	function Artists() {
		_classCallCheck(this, Artists);

		return _possibleConstructorReturn(this, (Artists.__proto__ || Object.getPrototypeOf(Artists)).apply(this, arguments));
	}

	_createClass(Artists, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "artist" },
				React.createElement(
					"h2",
					{ className: "center" },
					"Te Henga Collective"
				),
				React.createElement(
					"div",
					{ className: "content row" },
					React.createElement(
						"div",
						{ className: "bio col s3" },
						React.createElement(
							"p",
							null,
							"Insert Bio Here"
						)
					),
					React.createElement(
						"div",
						{ className: "gallery col s9 pull-s3" },
						React.createElement(
							"p",
							null,
							"Gallery"
						)
					)
				)
			);
		}
	}]);

	return Artists;
}(React.Component);

exports.default = Artists;