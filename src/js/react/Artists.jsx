import React from 'react';
import PropTypes from 'prop-types';

import Queries from '../utils/Queries';

import Artist from './Artist';
import ArtistDetail from './ArtistDetail';

export default class Artists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
    };
  }

  componentDidMount() {
    // Get Artists
    Queries.postRequest(
      { query: Queries.artist.getAll },
      (artists) => {
        // Sort Alphabetically
        const sortedArtists = artists.data.artists.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({
          artists: sortedArtists,
        });
      },
    );
  }

  render() {
    if (this.props.match.params.id) {
      return (
        <ArtistDetail
          artist={this.state.artists.find(artist => artist.id === this.props.match.params.id)}
        />
      );
    }

    const artistList = this.state.artists.map((artist) => {
      let image = '';

      try {
        image = require(`../../resources/images/artists/${artist.id}/main.jpg`);
      } catch (error) {
        console.warn(`Could not find images for ${artist.name}`);
      }

      return (
        <Artist
          key={artist.id}
          title={artist.name}
          image={image}
          path={`/artists/${artist.id}`}
        />
      );
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
Artists.propTypes = {
  match: PropTypes.object.isRequired,
};
