import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import {
	GraphQLDate
} from './Date';

const GraphQLArtist = new GraphQLObjectType({
	name: 'Artist',
	description: "...",
	fields: () => ({
		_id: { type: GraphQLString },
		name: { type: GraphQLString },
		bio: { type: GraphQLDate },
		path: { type: GraphQLString }
	})
});

export default GraphQLArtist;