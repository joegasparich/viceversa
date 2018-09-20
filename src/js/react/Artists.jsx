import React from 'react';
import Queries from '../utils/Queries';
import Artist from './Artist';

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
				this.setState({
					artists: artists.data.artists
				});
			}
		);

	}

	render() {
		let artistList = this.state.artists.map(artist =>
			<Artist
				key={artist._id}
				name={artist.name}
				path={artist.path}
			/>
		);

		return (
			<div className="row">
				<h4 className="center">Artists</h4>
				<div className="artists">
					{artistList}
				</div>
			</div>
		);
	}
}