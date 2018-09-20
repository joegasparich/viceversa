import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import { GraphQLDate } from './Date';
import GraphQLArtist from './Artist';

const GraphQLEvent = new GraphQLObjectType({
	name: 'Event',
	description: "...",
	fields: () => ({
		_id: { type: GraphQLString },
		name: { type: GraphQLString },
		date: { type: GraphQLDate },
		description: { type: GraphQLString },
		link: { type: GraphQLString },
		artists: {
			type: GraphQLList(GraphQLArtist),
			resolve: event=>{
				return [{
					name: "potato"
				},
				{
					name: "potato2"
				}]
			}
		}
	})
});

export default GraphQLEvent;