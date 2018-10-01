'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactRouterDom = require('react-router-dom');

var _Events = require('./Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_React$Component) {
	_inherits(Nav, _React$Component);

	function Nav() {
		_classCallCheck(this, Nav);

		return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
	}

	_createClass(Nav, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'navigation' },
					React.createElement(
						'a',
						{ href: '/', className: 'brand-logo' },
						'Vice',
						React.createElement('br', null),
						'Versa'
					),
					React.createElement(
						'ul',
						{ className: 'links' },
						React.createElement(
							'li',
							{ className: 'link' },
							React.createElement(
								_reactRouterDom.Link,
								{ to: '/artists/2' },
								'Artists'
							)
						),
						React.createElement(
							'li',
							{ className: 'link' },
							React.createElement(
								_reactRouterDom.Link,
								{ to: '/shed' },
								'Shed'
							)
						),
						React.createElement(
							'li',
							{ className: 'link' },
							React.createElement(
								_reactRouterDom.Link,
								{ to: 'https://www.bandcamp.com' },
								'Shop'
							)
						),
						React.createElement(
							'li',
							{ className: 'link' },
							React.createElement(
								_reactRouterDom.Link,
								{ to: '/about' },
								'About'
							)
						)
					),
					React.createElement('div', { className: 'break' }),
					React.createElement(
						'div',
						{ className: 'social-media' },
						React.createElement('a', { href: 'https://www.facebook.com', className: 'facebook' }),
						React.createElement('a', { href: 'https://www.instagram.com', className: 'instagram' }),
						React.createElement('a', { href: 'https://www.bandcamp.com', className: 'bandcamp' })
					),
					React.createElement('div', { className: 'break' }),
					React.createElement(_Events2.default, {
						displayCount: 3
					}),
					React.createElement('div', { className: 'break' }),
					React.createElement(
						'div',
						{ className: 'top' },
						React.createElement(
							'a',
							{ href: '#', onClick: function onClick() {
									window.scrollTo(0, 0);
								} },
							'Top'
						)
					)
				)
			);
		}
	}]);

	return Nav;
}(React.Component);

exports.default = Nav;