import tingodb from 'tingodb';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import GraphQLDate from './Date';

import GraphQLEvent from './Event';
import GraphQLArticle from './Article';
import GraphQLArtist from './Artist';

const { Db } = tingodb();

const DB_PREFIX = process.env.NODE_ENV === 'production' ? 'production' : 'development';
export function getDB() {
  return new Db(`./db/${DB_PREFIX}.data.db`, {});
}

export function getCollection(collectionName, args) {
  return new Promise((resolve, reject) => {
    const collection = getDB().collection(collectionName);
    collection.find(args, ((err, collectionItems) => {
      if (err) {
        reject(err);
      } else {
        collectionItems.toArray((err, data) => {
          resolve(data);
        });
      }
    }));
  });
}

export default new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    events: {
      type: GraphQLList(GraphQLEvent),
      args: {
        _id: {
          type: GraphQLString,
        },
        startDate: {
          type: GraphQLDate,
        },
        endDate: {
          type: GraphQLDate,
        },
      },
      resolve: (root, args) => getCollection('events', args),
    },
    articles: {
      type: GraphQLList(GraphQLArticle),
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) => getCollection('articles', args),
    },
    artists: {
      type: GraphQLList(GraphQLArtist),
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) => getCollection('artists', args),
    },
  }),
});
