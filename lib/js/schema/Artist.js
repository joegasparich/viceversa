'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphql = require('graphql');

var _Date = require('./Date');

var GraphQLArtist = new _graphql.GraphQLObjectType({
	name: 'Artist',
	description: "...",
	fields: function fields() {
		return {
			_id: { type: _graphql.GraphQLString },
			name: { type: _graphql.GraphQLString },
			bio: { type: _Date.GraphQLDate },
			content: { type: _graphql.GraphQLString }
		};
	}
});

exports.default = GraphQLArtist;