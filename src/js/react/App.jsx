import React from 'react';
import Cookie from 'js-cookie'
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline'

import Queries from '../utils/Queries';

import Entry from './Entry';
import Nav from './Nav';
import News from './News';
import About from './About';
import Artists from './Artists';
import Shed from './Shed';
import Article from './Article';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hasSeenEntry: false,
		};

		this.onClear = this.onClear.bind(this);
	}

	componentDidMount() {
		this.setState({
			hasSeenEntry: Boolean(Cookie.get('HasSeenEntry'))
		});

		// Queries.postRequest({
		// 	query: Queries.artist.create,
		// 	variables: {
		// 		name: "Bonnie Strides",
		// 		bio: "Bio",
		// 		content: "Content",
		// 	}
		// })

		// Queries.postRequest({
		// 	query: Queries.event.create,
		// 	variables: {
		// 		name: "Test Event",
		// 		date: new Date(),
		// 		description: "desc",
		// 		link: "#"
		// 	}
		// })
	}

	onClear() {
		this.setState({
			hasSeenEntry: true
		});
		Cookie.set("HasSeenEntry", true);
	}

	render() {

		if (!this.state.hasSeenEntry) {
			return (
				<React.Fragment>
					<CssBaseline />
					<Entry onClear={this.onClear} />
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<CssBaseline />
				<header>
				</header>
				<main>
					<div className="nav">
						<Nav />
					</div>
					<div className="content">
						<Switch location={this.props.location}>
							<Route path="/artists/:id?" component={Artists} />
							<Route path="/about" component={About} />
							<Route path="/shed" component={Shed} />
							<Route path="/" component={News} />
						</Switch>
					</div>
				</main>
				<footer></footer>
			</React.Fragment>
		);
	}
}
App.propTypes = {
	location: PropTypes.object.isRequired
}

export default withRouter(App);
