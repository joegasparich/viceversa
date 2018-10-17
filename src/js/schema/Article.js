import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLDate } from './Date';

const GraphQLArticle = new GraphQLObjectType({
  name: 'Article',
  description: '...',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLDate },
    content: { type: GraphQLString },
  }),
});

export default GraphQLArticle;
