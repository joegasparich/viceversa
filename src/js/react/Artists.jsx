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
				console.log(artists);
				this.setState({
					artists: artists.data.artists
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
				<h2 className="center">Artists</h2>
				<div className="content">
					{artistList}
				</div>
			</div>
		);
	}
}