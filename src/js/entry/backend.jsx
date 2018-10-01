import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from '../schema/Schema.js';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const app = express();

app.use('/graphql', graphQLHTTP({
	schema,
	graphiql: !IS_PRODUCTION
}));

app.get('/favicon.ico', (req, res) => {
	res.status(404);
	res.send();
});

app.use(express.static('dist'));

const context = {};
app.get('/*', (req, res) => {
	// Inserts the rendered React HTML into our main div
	const document = require('raw-loader!../../html/index.html');

	// Sends the response back to the client
	res.send(document);
});

app.listen(5000);