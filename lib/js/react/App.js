'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _reactRouterDom = require('react-router-dom');

var _Entry = require('./Entry');

var _Entry2 = _interopRequireDefault(_Entry);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _News = require('./News');

var _News2 = _interopRequireDefault(_News);

var _About = require('./About');

var _About2 = _interopRequireDefault(_About);

var _Artists = require('./Artists');

var _Artists2 = _interopRequireDefault(_Artists);

var _Shed = require('./Shed');

var _Shed2 = _interopRequireDefault(_Shed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			hasSeenEntry: false
		};

		_this.onClear = _this.onClear.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({
				hasSeenEntry: Boolean(_jsCookie2.default.get('HasSeenEntry'))
			});
		}
	}, {
		key: 'onClear',
		value: function onClear() {
			this.setState({
				hasSeenEntry: true
			});
			_jsCookie2.default.set("HasSeenEntry", true);
		}
	}, {
		key: 'render',
		value: function render() {

			if (!this.state.hasSeenEntry) {
				return React.createElement(_Entry2.default, { onClear: this.onClear });
			}

			return React.createElement(
				React.Fragment,
				null,
				React.createElement('header', null),
				React.createElement(
					'main',
					null,
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col s3', style: { position: 'fixed' } },
							React.createElement(_Nav2.default, null)
						),
						React.createElement(
							'div',
							{ className: 'col s9 push-s3', style: { position: 'relative' } },
							React.createElement(
								_reactRouterDom.Switch,
								{ location: this.props.location },
								React.createElement(_reactRouterDom.Route, { path: '/artists/:id?', component: _Artists2.default }),
								React.createElement(_reactRouterDom.Route, { path: '/about', component: _About2.default }),
								React.createElement(_reactRouterDom.Route, { path: '/shed', component: _Shed2.default }),
								React.createElement(_reactRouterDom.Route, { path: '/', component: _News2.default })
							)
						)
					)
				),
				React.createElement('footer', null)
			);
		}
	}]);

	return App;
}(React.Component);

exports.default = (0, _reactRouterDom.withRouter)(App);