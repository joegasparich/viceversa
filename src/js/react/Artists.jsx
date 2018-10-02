import React from 'react';

import Queries from '../utils/Queries';

import Square from './Square';

export default class Artists extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			artists: []
		};
	}

	componentDidMount() {
		//Get Artists
		Queries.postRequest(
			{ query: Queries.artist.getAll },
			(artists) => {
				//Sort Alphabetically
				let sortedArtists = artists.data.artists.sort((a, b) => {
					return a.name.localeCompare(b.name);
				})
				this.setState({
					artists: sortedArtists
				});
			}
		);

	}

	render() {
		let artistList = this.state.artists.map(artist =>
			<Square
				key={artist._id}
				title={artist.name}
			/>
		);

		return (
			<div className="artists">
				<div className="content">
					{artistList}
				</div>
			</div>
		);
	}
}