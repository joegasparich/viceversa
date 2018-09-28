import React from 'react';
import Cookie from 'js-cookie'
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Nav from './Nav';
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
				</header>
				<main>
					<div className="row">
						<div className="col s3" style={{ position: 'fixed' }}>
							<Nav />
						</div>
						<div className="col s9 push-s3" style={{ position: 'relative' }}>
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
				</main>
				<footer></footer>
			</React.Fragment>
		);
	}
}
App.propTypes = {
	location: PropTypes.object.isRequired,
};

export default withRouter(App);
