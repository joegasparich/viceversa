const Db = require('tingodb')().Db;

const DB_PREFIX = process.env.NODE_ENV === 'production' ? 'production' : 'development';
export function getDB() {
	return new Db(`./db/${DB_PREFIX}.data.db`, {});
}

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
	GraphQLDate
} from './Date';

import GraphQLEvent from './Event';
import GraphQLArticle from './Article';
import GraphQLArtist from './Artist';

export function getCollection(collection_name, args) {
	return new Promise((resolve, reject) => {
		const collection = getDB().collection(collection_name);
		collection.find(args, ((err, collection_items) => {
			if (err) {
				reject(err);
			} else {
				collection_items.toArray((err, data) => {
					resolve(data);
				});
			}
		}));
	});
}

export default new GraphQLObjectType({
	name: 'Query',
	description: "...",

	fields: () => ({
		events: {
			type: GraphQLList(GraphQLEvent),
			args: {
				_id: {
					type: GraphQLString
				},
				startDate: {
					type: GraphQLDate
				},
				endDate: {
					type: GraphQLDate
				}
			},
			resolve: (root, args) => {
				return getCollection('events', args);
			}
		},
		articles: {
			type: GraphQLList(GraphQLArticle),
			args: {
				_id: {
					type: GraphQLString
				}
			},
			resolve: (root, args) => {
				return getCollection('articles', args);
			}
		},
		artists: {
			type: GraphQLList(GraphQLArtist),
			args: {
				_id: {
					type: GraphQLString
				}
			},
			resolve: (root, args) => {
				return getCollection('artists', args);
			}
		}
	})
});