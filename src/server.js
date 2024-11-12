const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use('/graphql', async (req, res) => {
  const auth = await authMiddleware(req);
  
  return graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    context: auth
  })(req, res);
});

app.listen(4000, () => console.log('GraphQL server running on port 4000'));