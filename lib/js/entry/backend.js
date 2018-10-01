'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _Schema = require('../schema/Schema.js');

var _Schema2 = _interopRequireDefault(_Schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_PRODUCTION = process.env.NODE_ENV === 'production';

var app = (0, _express2.default)();

app.use('/graphql', (0, _expressGraphql2.default)({
	schema: _Schema2.default,
	graphiql: !IS_PRODUCTION
}));

app.get('/favicon.ico', function (req, res) {
	res.status(404);
	res.send();
});

app.use(_express2.default.static('dist'));

var context = {};
app.get('/*', function (req, res) {
	// Inserts the rendered React HTML into our main div
	var document = require('raw-loader!../../html/index.html');

	// Sends the response back to the client
	res.send(document);
});

app.listen(5000);