import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import GraphQLDate from './Date';
import { getDB } from './Query';
import GraphQLEvent from './Event';
import GraphQLArticle from './Article';
import GraphQLArtist from './Artist';

function insertItem(collectionName, args) {
  return new Promise((resolve, reject) => {
    const collection = getDB().collection(collectionName);
    collection.insert(args, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

function updateItem(collectionName, args) {
  return new Promise((resolve, reject) => {
    const collection = getDB().collection(collectionName);
    collection.update({ _id: args._id }, args, {}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

function deleteItem(collectionMame, _id) {
  return new Promise((resolve, reject) => {
    const collection = getDB().collection(collectionMame);
    collection.remove({ _id }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export default new GraphQLObjectType({
  name: 'Mutation',
  description: '...',
  fields: () => ({
    createEvent: {
      type: GraphQLEvent,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        date: {
          type: GraphQLNonNull(GraphQLDate),
        },
        description: {
          type: GraphQLString,
        },
        link: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args) => insertItem('events', args),
    },
    createArticle: {
      type: GraphQLArticle,
      args: {
        title: {
          type: GraphQLNonNull(GraphQLString),
        },
        date: {
          type: GraphQLNonNull(GraphQLDate),
        },
        content: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args) => insertItem('articles', args),
    },
    createArtist: {
      type: GraphQLArtist,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        bio: {
          type: GraphQLNonNull(GraphQLString),
        },
        content: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args) => insertItem('artists', args),
    },
    // updateBillingItem: {
    //   type: GraphQLBoolean,
    //   args: {
    //     _id: {
    //       type: GraphQLNonNull(GraphQLString)
    //     },
    //     type: {
    //       type: GraphQLNonNull(GraphQLString),
    //     },
    //     name: {
    //       type: GraphQLNonNull(GraphQLString)
    //     },
    //     startDate: {
    //       type: GraphQLNonNull(GraphQLDate)
    //     },
    //     endDate: {
    //       type: GraphQLDate
    //     },
    //     amount: {
    //       type: GraphQLNonNull(GraphQLFloat)
    //     }
    //   },
    //   resolve: (root, args) => updateItem('billingitems', args)
    // },
    // deleteBillingItem: {
    //   type: GraphQLBoolean,
    //   args: {
    //     _id: {
    //       type: GraphQLNonNull(GraphQLString)
    //     }
    //   },
    //   resolve: (root, { _id }) => deleteItem('billingitems', _id)
    // }
  }),
});
