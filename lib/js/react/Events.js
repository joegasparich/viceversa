'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var _Queries = require('../utils/Queries');

var _Queries2 = _interopRequireDefault(_Queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = function (_React$Component) {
	_inherits(Events, _React$Component);

	function Events(props) {
		_classCallCheck(this, Events);

		var _this = _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this, props));

		_this.state = {
			events: []
		};
		return _this;
	}

	_createClass(Events, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			_Queries2.default.postRequest({ query: _Queries2.default.event.getAll }, function (events) {
				_this2.setState({
					events: events.data.events
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var index = 0;

			var eventList = this.state.events.map(function (event) {
				if (index < _this3.props.displayCount || _this3.props.displayCount < 0) {
					index++;
					return _react2.default.createElement(_Event2.default, {
						key: event.id,
						name: event.name,
						date: new Date(event.date),
						description: event.description,
						link: event.link
					});
				}
			});

			return _react2.default.createElement(
				'div',
				{ className: 'event-list' },
				eventList
			);
		}
	}]);

	return Events;
}(_react2.default.Component);

exports.default = Events;