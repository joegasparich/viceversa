import React from 'react';
import Cookie from 'js-cookie'
import PropTypes from 'prop-types';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Nav from './Nav';
import Footer  from './Footer';
import Home from './Home';

import Events from './Events';
import Artists from './Artists';
import Entry from './Entry';

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
	}

	onClear() {
		this.setState({hasSeenEntry: true});
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
					<Nav />
				</header>,
				<main>
					<div className="container">
						<div className="row">
							<div className="col s12" style={{ position: 'relative' }}>
								<TransitionGroup>
									<CSSTransition key={this.props.location.pathname} timeout={1} classNames="page-fading-animation-transition" mountOnEnter unmountOnExit>
										<Switch location={this.props.location}>
											<Route path="/home" component={Home} />
											<Route path="/events" component={Events} />
											<Route path="/artists" component={Artists} />
											<Route path="/" component={Home} />
										</Switch>
									</CSSTransition>
								</TransitionGroup>
							</div>
						</div>
					</div>
				</main>,
				<footer className="page-footer deep-orange lighten-2">
					<Footer />
				</footer>
			</React.Fragment>
		);
	}
}
App.propTypes = {
	location: PropTypes.object.isRequired,
};

export default withRouter(App);
