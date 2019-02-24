import express from "express";
import http from "http";
import graphQLHTTP from "express-graphql";
import schema from "../schema/Schema";
import document from "../../html/index.html";

import "../../resources/images/favicon.ico";

//Get whether production from command line
const IS_PRODUCTION = process.env.NODE_ENV === "production";

//Create express app
const app = express();

//GraphQL - hide interface if in production
app.use(
	"/graphql",
	graphQLHTTP({
		schema,
		graphiql: !IS_PRODUCTION
	})
);

//Set static folder
app.use(express.static("dist"));

//Send back index.html as initial response
app.get("/*", (req, res) => {
	// Sends the response back to the client
	res.send(document);
});

//Start server
app.listen(5000);
