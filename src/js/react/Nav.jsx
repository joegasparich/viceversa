import React from 'react';

import Queries from '../utils/Queries';

import Events from './Events';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events: []
		};
	}

	render() {
		return (
			<div>
				<div className="navigation">
					<a href="/home" className="brand-logo">Vice<br />Versa</a>

					<ul className="links">
						<li className="link"><a href="/artists">Artists</a></li>
						<li className="link"><a href="/shed">Shed</a></li>
						<li className="link"><a href="/shop">Shop</a></li>
						<li className="link"><a href="/about">About</a></li>
					</ul>

					<div className="break" />

					<div className="social-media">
						<a href="www.facebook.com" className="facebook"></a>
						<a href="www.instagram.com" className="instagram"></a>
						<a href="www.bandcamp.com" className="bandcamp"></a>
					</div>

					<div className="break" />

					<Events
						displayCount={3}
					/>

					<div className="break" />

					<div className="top">
						<a href="#" onClick={() => {window.scrollTo(0, 0)}}>Top</a>
					</div>
				</div>
			</div>
		);
	}
}