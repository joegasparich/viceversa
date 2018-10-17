'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphql = require('graphql');

var _Date = require('./Date');

var GraphQLArticle = new _graphql.GraphQLObjectType({
	name: 'Article',
	description: "...",
	fields: function fields() {
		return {
			id: { type: _graphql.GraphQLString },
			title: { type: _graphql.GraphQLString },
			date: { type: _Date.GraphQLDate },
			content: { type: _graphql.GraphQLString }
		};
	}
});

exports.default = GraphQLArticle;