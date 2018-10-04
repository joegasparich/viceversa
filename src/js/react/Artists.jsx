import React from 'react';

import Queries from '../utils/Queries';

import Square from './Square';
import ArtistDetail from './ArtistDetail';

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
		if(this.props.match.params.id) {
			console.log(this.state.artists.find(artist => artist._id == this.props.match.params.id))
			return (
				<ArtistDetail
					artist={this.state.artists.find(artist => artist._id == this.props.match.params.id)}
				/>
			)
		}

		let artistList = this.state.artists.map(artist => {
			let image = "";
			
			try {
				image = require(`../../resources/images/artists/${artist._id}/main.jpg`);
			} catch (error) {}
		
			return(
				<Square
					key={artist._id}
					title={artist.name}
					image={image}
					path={"/artists/" + artist._id}
				/>
			)
		});

		return (
			<div className="artists">
				<div className="content">
					{artistList}
				</div>
			</div>
		);
	}
}