import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import GraphQLDate from './Date';

const GraphQLArticle = new GraphQLObjectType({
  name: 'Article',
  description: '...',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLDate },
    content: { type: GraphQLString },
    image: { type: GraphQLString },
    animation: { type: GraphQLBoolean },
  }),
});

export default GraphQLArticle;
