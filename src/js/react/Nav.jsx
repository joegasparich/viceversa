import React from 'react';
import {Link} from 'react-router-dom';

import Events from './Events';

export default class Nav extends React.Component {

	render() {
		return (
			<div>
				<div className="navigation">
					<Link to="/" className="brand-logo">Vice<br />Versa</Link>

					<ul className="links">
						<li className="link"><Link to="/artists">Artists</Link></li>
						<li className="link"><Link to="/shed">Shed</Link></li>
						<li className="link"><Link to="https://www.bandcamp.com">Shop</Link></li>
						<li className="link"><Link to="/about">About</Link></li>
					</ul>

					<div className="break" />

					<div className="social-media">
						<Link to="https://www.facebook.com" className="facebook"></Link>
						<Link to="https://www.instagram.com" className="instagram"></Link>
						<Link to="https://www.bandcamp.com" className="bandcamp"></Link>
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