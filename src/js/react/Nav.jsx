import React from 'react';

import DynamicImport from '../utils/DynamicImport';
import Queries from '../utils/Queries';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			artists: []
		};
	}

	componentDidMount() {
		//Load Materialize
		DynamicImport.Materialize.then((M) => {
			new M.Dropdown(this.dropdownTrigger, {
				hover: true,
				coverTrigger: false,
				inDuration: 0,
				outDuration: 0
			});

			let elems = document.querySelectorAll('.sidenav');
			M.Sidenav.init(elems, {});
		});

		//Load Artists
		Queries.postRequest(
			{ query: Queries.artist.getAll },
			(artists) => {
				this.setState({
					artists: artists.data.artists
				});
			}
		);
	}

	render() {
		let artistElements = this.state.artists.map(artist => 
			<li key={artist._id}>
				<a href={artist.path}>{artist.name}</a>
			</li>
		);

		return (
			<nav className="deep-orange lighten-2">
				<div className="nav-wrapper">
					<a href="/home" className="brand-logo center">Vice Versa</a>
					<a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					<ul className="left hide-on-med-and-down">
						<li className="nav-item"><a ref={dropdownTrigger => this.dropdownTrigger = dropdownTrigger} href="/artists" className="dropdown-trigger" data-target="dropdown1">Artists<i className="material-icons right">arrow_drop_down</i></a></li>
						<li className="nav-item"><a href="/events">Events</a></li>
						<li className="nav-item"><a href="#">Merch</a></li>
						<li className="nav-item"><a href="/contact">Contact</a></li>
					</ul>
					<ul className="sidenav" id="mobile-nav">
						<li className="nav-item"><a href="/artists" className="dropdown-trigger" data-target="dropdown1">Artists</a></li>
						<li className="mobile-artist-links">
							<ul>{artistElements}</ul>
						</li>
						<li className="nav-item"><a href="/events">Events</a></li>
						<li className="nav-item"><a href="#">Merch</a></li>
						<li className="nav-item"><a href="/contact">Contact</a></li>
					</ul>
				</div>
				<ul id="dropdown1" className="dropdown-content">
					{artistElements}
				</ul>
			</nav>
		);
	}
}