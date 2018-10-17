'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queries = function () {
	function Queries() {
		_classCallCheck(this, Queries);
	}

	_createClass(Queries, null, [{
		key: 'postRequest',


		/**
    * Returns a promise of query results
    * @param {object} query_data GraphQL query data
    */
		value: function postRequest(query_data) {
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/graphql');
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.onload = function () {
					if (xhr.status === 200 && xhr.response) {
						var response = JSON.parse(xhr.response);
						callback(response);
						resolve(response);
					} else if (xhr.status !== 200) {
						reject(xhr.response);
						throw xhr.response;
					}
				};
				xhr.send(JSON.stringify(query_data));
			});
		}

		/**
     * Posts a request and returns an early cached result if available
     * @param {object} query_data GraphQL query data
     * @param {func} callback Callback to receieve server or cached response
     */

	}, {
		key: 'postCachedRequest',
		value: function postCachedRequest(query_data, callback) {
			var _this = this;

			var cache_key = (0, _md2.default)(JSON.stringify(query_data));
			var cache_item = this.cache.get(cache_key);
			if (cache_item) {
				callback(cache_item);
			}
			this.postRequest(query_data).then(function (result) {
				_this.cache.set(cache_key, result);
				callback(result);
			});
		}
	}, {
		key: 'cache',
		get: function get() {
			if (!this.lru_cache) {
				this.lru_cache = (0, _lruCache2.default)({
					max: 10
				});
			}
			return this.lru_cache;
		}
	}, {
		key: 'event',
		get: function get() {
			return {
				getAll: '{\n                events {\n\t\t\t\t\tid\n                    name\n                    date\n                    description\n                    link\n                }\n            }',
				create: 'mutation createEvent($name: String!, $date: Date!, $description: String, $link: String!){\n\t\t\t\tcreateEvent(name: $name, date: $date, description: $description, link: $link) {\n                    id\n                }\n            }' //,
				// update: `mutation updateBillingItem($id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
				//     updateBillingItem(id: $id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
				// }`,
				// delete: `mutation deleteBillingItem($id: String!){
				//     deleteBillingItem(id: $id)
				// }`,
			};
		}
	}, {
		key: 'article',
		get: function get() {
			return {
				getAll: '{\n                articles {\n\t\t\t\t\tid\n                    title\n                    date\n                    content\n                }\n            }',
				create: 'mutation createArticle($title: String!, $date: Date!, $content: String!){\n\t\t\t\tcreateArticle(title: $title, date: $date, content: $content) {\n                    id\n                }\n            }' //,
				// update: `mutation updateBillingItem($id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
				//     updateBillingItem(id: $id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
				// }`,
				// delete: `mutation deleteBillingItem($id: String!){
				//     deleteBillingItem(id: $id)
				// }`,
			};
		}
	}, {
		key: 'artist',
		get: function get() {
			return {
				getAll: '{\n                artists {\n\t\t\t\t\tid\n                    name\n\t\t\t\t\tbio\n\t\t\t\t\tpath\n                }\n            }',
				create: 'mutation createArtist($name: String!, $bio: String!, $path: String!){\n\t\t\t\tcreateArtist(name: $name, bio: $bio, path: $path) {\n                    id\n                }\n            }' //,
				// update: `mutation updateBillingItem($id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
				//     updateBillingItem(id: $id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
				// }`,
				// delete: `mutation deleteBillingItem($id: String!){
				//     deleteBillingItem(id: $id)
				// }`,
			};
		}
	}]);

	return Queries;
}();

exports.default = Queries;