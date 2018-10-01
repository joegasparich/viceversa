import React from 'react';
import Cookie from 'js-cookie'
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Queries from '../utils/Queries';

import Entry from './Entry';
import Nav from './Nav';
import News from './News';
import About from './About';
import Artists from './Artists';
import Shed from './Shed';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hasSeenEntry: false
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
	}

	onClear() {
		this.setState({
			hasSeenEntry: true
		});
		Cookie.set("HasSeenEntry", true);
	}

	render() {

		if(!this.state.hasSeenEntry) {
			return (
				<Entry onClear={this.onClear}/>
			);
		}

		return (
			<React.Fragment>
				<header>
				</header>
				<main>
					<div className="row">
						<div className="col s3" style={{ position: 'fixed' }}>
							<Nav />
						</div>
						<div className="col s9 push-s3" style={{ position: 'relative' }}>
							<Switch location={this.props.location}>
								<Route path="/artists/:id?" component={Artists} />
								<Route path="/about" component={About} />
								<Route path="/shed" component={Shed} />
								<Route path="/" component={News} />
							</Switch>
						</div>
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
