import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const GraphQLArtist = new GraphQLObjectType({
  name: 'Artist',
  description: '...',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    bio: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

export default GraphQLArtist;
