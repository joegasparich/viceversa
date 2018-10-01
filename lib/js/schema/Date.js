'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLDate = undefined;

var _graphql = require('graphql');

var GraphQLDate = exports.GraphQLDate = new _graphql.GraphQLScalarType({
    name: 'Date',
    description: 'The `Date` scalar type a date',
    serialize: function serialize(date) {
        return date;
    },
    parseValue: function parseValue(value) {
        return new Date(value);
    },
    parseLiteral: function parseLiteral(date) {
        return date;
    }
});