import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Styles
import "../../sass/base.scss";

import App from "../react/App";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("app")
);
