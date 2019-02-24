import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean
} from "graphql";

const GraphQLLink = new GraphQLObjectType({
	name: "Link",
	description: "...",
	fields: () => ({
		title: { type: GraphQLString },
		url: { type: GraphQLString }
	})
});

const GraphQLArtist = new GraphQLObjectType({
	name: "Artist",
	description: "...",
	fields: () => ({
		_id: { type: GraphQLString },
		name: { type: GraphQLString },
		url: { type: GraphQLString },
		bio: { type: GraphQLString },
		content: { type: GraphQLString },
		links: { type: GraphQLList(GraphQLLink) },
		showTitle: { type: GraphQLBoolean }
	})
});

export default GraphQLArtist;
