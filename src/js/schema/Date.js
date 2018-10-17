import { GraphQLScalarType } from 'graphql';

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'The `Date` scalar type a date',
  serialize: date => date,
  parseValue: value => new Date(value),
  parseLiteral: date => date,
});

export default GraphQLDate;
