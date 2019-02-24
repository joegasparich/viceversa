//External Imports
import React from "react";
import Cookie from "js-cookie";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { hot } from "react-hot-loader";
import ReactGA from "react-ga";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

//Internal Imports
import Entry from "./Entry";
import Nav from "./Nav";
import News from "./News";
import About from "./About";
import Artists from "./Artists";
import Shed from "./Shed";
import Shop from "./Shop";

//Main App Component
class App extends React.Component {
	constructor(props) {
		super(props);

		this.initializeReactGA();

		const entry =
			!Boolean(Cookie.get("HasSeenEntry")) &&
			window.location.pathname == "/";

		this.state = {
			showEntry: entry,
			delayLoad: entry
		};

		this.onClear = this.onClear.bind(this);
	}

	//Google Analytics
	initializeReactGA() {
		ReactGA.initialize("UA-129101953-1");
		ReactGA.pageview(window.location.pathname + window.location.search);
	}

	//On entry from entry page
	onClear() {
		this.setState({
			showEntry: false
		});
		Cookie.set("HasSeenEntry", true);
		//Turn off delayLoad later so load is delayed while animating
		setTimeout(
			() =>
				this.setState({
					delayLoad: false
				}),
			1000
		);
	}

	render() {
		let content;
		//Show entry page if hasn't seen it this session
		if (this.state.showEntry) {
			content = (
				<div key="entry">
					<Entry onClear={this.onClear} />
				</div>
			);
		} else {
			content = (
				<main key="main">
					<div className="background" />
					<div className="nav">
						<Nav />
					</div>
					<div className="content">
						<Switch location={this.props.location}>
							<Route path="/artists/:id?" component={Artists} />
							<Route path="/about" component={About} />
							<Route path="/shed" component={Shed} />
							<Route path="/shop" component={Shop} />
							<Route path="/articles/:id?" component={News} />
							<Route
								path="/"
								render={props => (
									<News
										{...props}
										delayLoad={this.state.delayLoad}
									/>
								)}
							/>
						</Switch>
					</div>
				</main>
			);
		}

		//Render app
		return (
			<React.Fragment>
				<CssBaseline />
				<header />
				<ReactCSSTransitionGroup
					transitionName="entry"
					transitionEnter={false}
					transitionLeaveTimeout={3000}
				>
					{content}
				</ReactCSSTransitionGroup>
				<footer />
			</React.Fragment>
		);
	}
}
App.propTypes = {
	location: PropTypes.object.isRequired
};

export default withRouter(hot(module)(App));
