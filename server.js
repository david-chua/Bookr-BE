const { ApolloServer } = require("apollo-server");
require("dotenv/config");
const typeDefs = require("./typeDefs");
const { authAndFindUser, authenticate } = require("./auth/authenticate");
const resolvers = require("./resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  cors: false,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = await req.headers.authorization;
      if (authToken.length > 1000) {
        currentUser = await authAndFindUser(authToken);
      } else {
        currentUser = await authenticate(authToken);
      }
    } catch (err) {
      return err
    }
    return { currentUser };
  }
});

module.exports = server;
