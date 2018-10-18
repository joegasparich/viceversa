import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import GraphQLDate from './Date';

const GraphQLEvent = new GraphQLObjectType({
  name: 'Event',
  description: '...',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLDate },
    description: { type: GraphQLString },
    link: { type: GraphQLString },
  }),
});

export default GraphQLEvent;