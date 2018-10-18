import webpack from 'webpack';
import express from 'express';
import middleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import graphQLHTTP from 'express-graphql';
import schema from '../schema/Schema';
import document from '../../html/index.html';
import webpackConfig from '../../../webpack.frontend.dev.config';

import '../../resources/images/favicon.ico';

const app = express();
const compiler = webpack(webpackConfig);

app.use(middleware(compiler, {}));
app.use(hotMiddleware(compiler));

app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true,
}));

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  // Sends the response back to the client
  res.send(document);
});

app.listen(5000);
