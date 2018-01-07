const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const booksDb = require('./books');

const PORT = 3000;
const APP_URL = 'http://localhost:8080';

const typeDefs = `
  type Book {
    id: ID!
    title: String
    author: String
    description: String
  }
  type Query {
    book(id: ID!): Book
    bookList: [Book]
  }
`;
const resolvers = {
  Query: {
    book(_, { id }) {
      return booksDb.find(book => book.id === id);
    },
    bookList() {
      return booksDb;
    },
  },
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

// Enable pre-flighting on all requests.
// See: https://www.npmjs.com/package/cors#enabling-cors-pre-flight
app.options('*', cors());
// Only allow cross origin requests
// coming from the URL specified above.
app.use(cors({ origin: APP_URL }));

// bodyParser is needed for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
