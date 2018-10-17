'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Queries = require('../utils/Queries');

var _Queries2 = _interopRequireDefault(_Queries);

var _Square = require('./Square');

var _Square2 = _interopRequireDefault(_Square);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var News = function (_React$Component) {
	_inherits(News, _React$Component);

	function News(props) {
		_classCallCheck(this, News);

		var _this = _possibleConstructorReturn(this, (News.__proto__ || Object.getPrototypeOf(News)).call(this, props));

		_this.state = {
			articles: [],
			events: []
		};
		return _this;
	}

	_createClass(News, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			//Get Articles
			_Queries2.default.postRequest({ query: _Queries2.default.article.getAll }, function (articles) {
				_this2.setState({
					articles: articles.data.articles
				});
			});

			// Queries.postRequest({
			// 	query: Queries.article.create,
			// 	variables: {
			// 		title: "Article",
			// 		date: new Date(),
			// 		content: "Description",
			// 	}
			// })
		}
	}, {
		key: 'render',
		value: function render() {
			var articleList = this.state.articles.map(function (article) {
				return _react2.default.createElement(_Square2.default, {
					title: article.title,
					key: article.id
				});
			});

			return _react2.default.createElement(
				'div',
				{ className: 'news-feed' },
				articleList,
				_react2.default.createElement('ul', { className: 'pagination' })
			);
		}
	}]);

	return News;
}(_react2.default.Component);

exports.default = News;