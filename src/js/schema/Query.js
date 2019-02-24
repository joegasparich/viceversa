import { MongoClient } from "mongodb";
import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import GraphQLDate from "./Date";

import GraphQLEvent from "./Event";
import GraphQLArticle from "./Article";
import GraphQLArtist from "./Artist";

const MONGO_URL = "mongodb://127.0.0.1:27017/";

let globalDB = null;
export async function getDB() {
	if (!globalDB) {
		const dbc = await MongoClient.connect(MONGO_URL);
		globalDB = dbc.db("viceversa");
		return globalDB;
	}
	return globalDB;
}

export function getCollection(collectionName, args) {
	return new Promise(async (resolve, reject) => {
		const db = await getDB();
		const collection = db.collection(collectionName);
		collection.find(args, (err, collectionItems) => {
			if (err) {
				reject(err);
			} else {
				collectionItems.toArray((e, data) => {
					resolve(data);
				});
			}
		});
	});
}

export default new GraphQLObjectType({
	name: "Query",
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
			resolve: (root, args) => getCollection("events", args)
		},
		articles: {
			type: GraphQLList(GraphQLArticle),
			args: {
				_id: {
					type: GraphQLString
				}
			},
			resolve: (root, args) => getCollection("articles", args)
		},
		artists: {
			type: GraphQLList(GraphQLArtist),
			args: {
				_id: {
					type: GraphQLString
				}
			},
			resolve: (root, args) => getCollection("artists", args)
		}
	})
});
