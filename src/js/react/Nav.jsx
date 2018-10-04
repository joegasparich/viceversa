import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/icons/Menu';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Facebook from 'mdi-material-ui/Facebook';
import Instagram from 'mdi-material-ui/Instagram';
import Headphones from 'mdi-material-ui/Headphones';

import Events from './Events';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
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
		this.toggleExpandNav = this.toggleExpandNav.bind(this);
		this.toggleExpandEvents = this.toggleExpandEvents.bind(this);
	}

	toggleExpandNav() {
		this.setState({
			expanded: !this.state.expanded
		});
		if(this.state.expanded) {
			this.collapseElement(this.navContent.current);
			this.navContent.current.addEventListener('transitionend', function(e) { this.navContent.current.style.height = null; }, {once: true});
		} else {
			this.expandElement(this.navContent.current);
		}
	}

	toggleExpandEvents() {
		this.setState({
			expandEvents: !this.state.expandEvents
		});
		if(this.state.expandEvents) {
			//Expand other elements
			this.expandElement(this.collapseTop.current);
			this.collapseTop.current.addEventListener('transitionend', function(e) { this.collapseTop.current.style.height = null; }, {once: true});
			this.expandElement(this.collapseBottom.current);
			this.collapseBottom.current.addEventListener('transitionend', function(e) { this.collapseBottom.current.style.height = null; }, {once: true});
			
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
			const style = window.getComputedStyle(element)
			const margin = parseInt(style.getPropertyValue('margin-bottom')) + parseInt(style.getPropertyValue('margin-top'));
			let endHeight = this.navContent.current.scrollHeight - margin;
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
		const style = window.getComputedStyle(element)
		let elementTransition = style.getPropertyValue('transition');
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
	}

	render() {
		return (
			<div>
				<div className="navigation">
					<div className="nav-head">
						<a id="menu" href="#" onClick={this.toggleExpandNav} ><Menu /></a>
						<Link to="/" id="brand-logo"></Link>
						<a id="top-mob" href="#" onClick={() => { window.scrollTo(0, 0) }} ><ArrowUpward /></a>
					</div>
					<div className={"nav-content"} ref={this.navContent}>
						<div className="collapsable" ref={this.collapseTop}>
							<ul className="links">
								<li id="artists" className="link"><Link to="/artists" className={location.pathname.includes("artist") ? "active" : ""}>Artists</Link></li>
								<li id="shed" className="link"><Link to="/shed" className={location.pathname.includes("shed") ? "active" : ""}>Shed</Link></li>
								<li id="shop" className="link"><a href="//bandcamp.com">Shop</a></li>
								<li id="about" className="link"><Link to="/about" className={location.pathname.includes("about") ? "active" : ""}>About</Link></li>
							</ul>

							<div className="break" />

							<div id="social-media">
								<a id="facebook" href="//facebook.com"><Facebook /></a>
								<a id="instagram" href="//instagram.com"><Instagram /></a>
								<a id="bandcamp" href="//bandcamp.com"><Headphones /></a>
							</div>
						</div>

						<div className="break" />

						<div className="events" ref={this.expand}>
							<Events displayCount={this.state.eventsExpanded ? -1 : 3} />
						</div>

						<div className="break">
							<a id="more" href="#" onClick={this.toggleExpandEvents}>{this.state.eventsExpanded ? "Less" : "More"}</a>
						</div>

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