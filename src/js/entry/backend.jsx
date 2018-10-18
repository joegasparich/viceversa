import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from '../schema/Schema';
import document from '../../html/index.html';

import '../../resources/images/favicon.ico';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const app = express();

app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: !IS_PRODUCTION,
}));

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  // Sends the response back to the client
  res.send(document);
});

app.listen(5000);
