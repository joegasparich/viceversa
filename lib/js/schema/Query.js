'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getDB = getDB;
exports.getCollection = getCollection;

var _graphql = require('graphql');

var _Date = require('./Date');

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var _Article = require('./Article');

var _Article2 = _interopRequireDefault(_Article);

var _Artist = require('./Artist');

var _Artist2 = _interopRequireDefault(_Artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Db = require('tingodb')().Db;

var DB_PREFIX = process.env.NODE_ENV === 'production' ? 'production' : 'development';
function getDB() {
	return new Db('./db/' + DB_PREFIX + '.data.db', {});
}

function getCollection(collection_name, args) {
	return new Promise(function (resolve, reject) {
		var collection = getDB().collection(collection_name);
		collection.find(args, function (err, collection_items) {
			if (err) {
				reject(err);
			} else {
				collection_items.toArray(function (err, data) {
					resolve(data);
				});
			}
		});
	});
}

exports.default = new _graphql.GraphQLObjectType({
	name: 'Query',
	description: "...",

	fields: function fields() {
		return {
			events: {
				type: (0, _graphql.GraphQLList)(_Event2.default),
				args: {
					_id: {
						type: _graphql.GraphQLString
					},
					startDate: {
						type: _Date.GraphQLDate
					},
					endDate: {
						type: _Date.GraphQLDate
					}
				},
				resolve: function resolve(root, args) {
					return getCollection('events', args);
				}
			},
			articles: {
				type: (0, _graphql.GraphQLList)(_Article2.default),
				args: {
					_id: {
						type: _graphql.GraphQLString
					}
				},
				resolve: function resolve(root, args) {
					return getCollection('articles', args);
				}
			},
			artists: {
				type: (0, _graphql.GraphQLList)(_Artist2.default),
				args: {
					_id: {
						type: _graphql.GraphQLString
					}
				},
				resolve: function resolve(root, args) {
					return getCollection('artists', args);
				}
			}
		};
	}
});