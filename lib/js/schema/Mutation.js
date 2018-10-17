'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphql = require('graphql');

var _Date = require('./Date');

var _Query = require('./Query');

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var _Article = require('./Article');

var _Article2 = _interopRequireDefault(_Article);

var _Artist = require('./Artist');

var _Artist2 = _interopRequireDefault(_Artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertItem(collection_name, args) {
	return new Promise(function (resolve, reject) {
		var collection = (0, _Query.getDB)().collection(collection_name);
		collection.insert(args, function (err, doc) {
			if (err) {
				reject(err);
			} else {
				resolve(doc);
			}
		});
	});
}

function updateItem(collection_name, args) {
	return new Promise(function (resolve, reject) {
		var collection = (0, _Query.getDB)().collection(collection_name);
		collection.update({ id: args.id }, args, {}, function (err, doc) {
			if (err) {
				reject(err);
			} else {
				resolve(doc);
			}
		});
	});
}

function deleteItem(collection_name, id) {
	return new Promise(function (resolve, reject) {
		var collection = (0, _Query.getDB)().collection(collection_name);
		collection.remove({ id: id }, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

exports.default = new _graphql.GraphQLObjectType({
	name: 'Mutation',
	description: "...",
	fields: function fields() {
		return {
			createEvent: {
				type: _Event2.default,
				args: {
					name: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					},
					date: {
						type: (0, _graphql.GraphQLNonNull)(_Date.GraphQLDate)
					},
					description: {
						type: _graphql.GraphQLString
					},
					link: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					}
				},
				resolve: function resolve(root, args) {
					return insertItem('events', args);
				}
			},
			createArticle: {
				type: _Article2.default,
				args: {
					title: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					},
					date: {
						type: (0, _graphql.GraphQLNonNull)(_Date.GraphQLDate)
					},
					content: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					}
				},
				resolve: function resolve(root, args) {
					return insertItem('articles', args);
				}
			},
			createArtist: {
				type: _Artist2.default,
				args: {
					name: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					},
					bio: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					},
					path: {
						type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
					}
				},
				resolve: function resolve(root, args) {
					return insertItem('artists', args);
				}
				// updateBillingItem: {
				// 	type: GraphQLBoolean,
				// 	args: {
				// 		id: {
				// 			type: GraphQLNonNull(GraphQLString)
				// 		},
				// 		type: {
				// 			type: GraphQLNonNull(GraphQLString),
				// 		},
				// 		name: {
				// 			type: GraphQLNonNull(GraphQLString)
				// 		},
				// 		startDate: {
				// 			type: GraphQLNonNull(GraphQLDate)
				// 		},
				// 		endDate: {
				// 			type: GraphQLDate
				// 		},
				// 		amount: {
				// 			type: GraphQLNonNull(GraphQLFloat)
				// 		}
				// 	},
				// 	resolve: (root, args) => updateItem('billingitems', args)
				// },
				// deleteBillingItem: {
				// 	type: GraphQLBoolean,
				// 	args: {
				// 		id: {
				// 			type: GraphQLNonNull(GraphQLString)
				// 		}
				// 	},
				// 	resolve: (root, { id }) => deleteItem('billingitems', id)
				// }
			} };
	}
});