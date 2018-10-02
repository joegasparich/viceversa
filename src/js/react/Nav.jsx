import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Headphones } from 'mdi-material-ui';

import Events from './Events';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expandEvents: false,
			eventsExpanded: false,
			eventsHeight: 0
		};

		//References
		this.collapseTop = React.createRef();
		this.collapseBottom = React.createRef();
		this.expand = React.createRef();
		this.navContent = React.createRef();

		//Binds
		this.toggleExpandEvents = this.toggleExpandEvents.bind(this);
	}

	toggleExpandEvents() {
		this.setState({
			expandEvents: !this.state.expandEvents
		});
		if(this.state.expandEvents) {
			//Expand other elements
			this.expandElement(this.collapseTop.current);
			this.expandElement(this.collapseBottom.current);
			
			//Collapse events
			let element = this.expand.current;
			let setExpanded = () => {this.setState({eventsExpanded: false})};
			element.style.height = this.state.eventsHeight + 'px';

			element.addEventListener('transitionend', function(e) {
				element.style.height = null;
				setExpanded();
			}, {once: true});
		} else {
			this.setState({
				eventsHeight: this.expand.current.scrollHeight,
				eventsExpanded: true
			});

			//Collapse other elements
			this.collapseElement(this.collapseTop.current);
			this.collapseElement(this.collapseBottom.current);

			//Expand events
			let element = this.expand.current;
			let startHeight = element.scrollHeight;
			let endHeight = this.navContent.current.scrollHeight;
			let elementTransition = element.style.transition;
			element.style.transition = '';

			requestAnimationFrame(function() {
				element.style.height = startHeight + 'px';
				element.style.transition = elementTransition;

				requestAnimationFrame(function() {
					element.style.height = endHeight + 'px';
				});
			});
		}
	}

	collapseElement(element) {
		let sectionHeight = element.scrollHeight;
		let elementTransition = element.style.transition;
		element.style.transition = '';

		requestAnimationFrame(function() {
			element.style.height = sectionHeight + 'px';
			element.style.transition = elementTransition;

			requestAnimationFrame(function() {
				element.style.height = 0 + 'px';
			});
		});
	}

	expandElement(element) {
		let sectionHeight = element.scrollHeight;
		element.style.height = sectionHeight + 'px';

		element.addEventListener('transitionend', function(e) {
			element.style.height = null;
		}, {once: true});
	}

	render() {
		return (
			<div>
				<div className="navigation">
					<Link to="/" id="brand-logo"></Link>
					<div className="nav-content" ref={this.navContent}>
						<div className="collapsable" ref={this.collapseTop}>
							<ul className="links">
								<li id="artists" className="link"><Link to="/artists" className={location.pathname.includes("artist") ? "active" : ""}>Artists</Link></li>
								<li id="shed" className="link"><Link to="/shed" className={location.pathname.includes("shed") ? "active" : ""}>Shed</Link></li>
								<li id="shop" className="link"><a href="//bandcamp.com">Shop</a></li>
								<li id="about" className="link"><Link to="/about" className={location.pathname.includes("about") ? "active" : ""}>About</Link></li>
							</ul>

							<div className="break" />

							<div id="social-media">
								<a href="//facebook.com" className="facebook"><Facebook /></a>
								<a href="//instagram.com" className="instagram"><Instagram /></a>
								<a href="//bandcamp.com" className="bandcamp"><Headphones /></a>
							</div>
						</div>

						<div className="break" />

						<div className="events" ref={this.expand}>
							<Events displayCount={this.state.eventsExpanded ? -1 : 3} />
							<a href="#" id="more" onClick={this.toggleExpandEvents}>{this.state.eventsExpanded ? "Less" : "More"}</a>
						</div>

						<div className="break" />

						<div className="collapsable" ref={this.collapseBottom}>
							<div id="top">
								<a href="#" onClick={() => { window.scrollTo(0, 0) }}>Top</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}