'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphql = require('graphql');

var _Date = require('./Date');

var GraphQLEvent = new _graphql.GraphQLObjectType({
	name: 'Event',
	description: "...",
	fields: function fields() {
		return {
			id: { type: _graphql.GraphQLString },
			name: { type: _graphql.GraphQLString },
			date: { type: _Date.GraphQLDate },
			description: { type: _graphql.GraphQLString },
			link: { type: _graphql.GraphQLString }
		};
	}
});

exports.default = GraphQLEvent;