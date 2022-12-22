const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  name: String!
  email: String!
  favorites: [Location!]!
}

type Location {
  id: ID!
  name: String!
  type: String!
  location: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  locations: [Location!]!
  location(id: ID!): Location
}

type Mutation {
  addUser(name: String!, email: String!): User!
  addLocation(name: String!, type: String!, location: String!): Location!
  addFavorite(userId: ID!, locationId: ID!): User!
  removeFavorite(userId: ID!, locationId: ID!): User!
}
`;

module.exports = typeDefs;
