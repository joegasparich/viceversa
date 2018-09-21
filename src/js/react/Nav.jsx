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
			<div>
				<div className="navigation">
					<a href="/home" className="brand-logo">Vice Versa</a>
					<ul className="navigation-content">
						<li><a href="/artists">Artists</a></li>
						<li><a href="#">Shop</a></li>
						<li><a href="#">Shed</a></li>
						<li><a href="/contact">About</a></li>
					</ul>
				</div>
				<ul id="dropdown1" className="dropdown-content">
					{artistElements}
				</ul>
			</div>
		);
	}
}