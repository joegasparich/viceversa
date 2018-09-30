import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from '../schema/Schema.js';
import App from '../react/App';

import auth from 'basic-auth';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

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
	const html = ReactDOMServer.renderToString(
		<StaticRouter
			location={req.url}
			context={context}>
			<App />
		</StaticRouter>
	);

	// Inserts the rendered React HTML into our main div
	const document = require('raw-loader!../../html/index.html').replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

	// Sends the response back to the client
	res.send(document);
});

app.listen(5000);