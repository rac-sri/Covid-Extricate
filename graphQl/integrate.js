const typeDefs = require("./schema");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  settings: {
    "editor.theme": "light",
  },
});

module.exports = server;
