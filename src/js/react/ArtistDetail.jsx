import React from 'react';
import PropTypes from 'prop-types';

export default class ArtistDetail extends React.Component {
  render() {
    if (this.props.artist) {
      let mainImage = '';
      let bannerImage = '';

      try {
        mainImage = require(`../../resources/images/artists/${this.props.artist.name}/main.jpg`);
        bannerImage = require(`../../resources/images/artists/${this.props.artist.name}/banner.jpg`);
      } catch (error) {
        console.warn(`Could not find images for ${this.props.artist.name}`);
      }

      return (
        <div className="artist">
          <div className="artist-banner">
            <img src={bannerImage} alt={this.props.artist.name} />
            <h1 className="center">{this.props.artist.name}</h1>
          </div>
          <div className="artist-content">
            <div className="bio">
              <h3 className="center">Bio</h3>
              <img className="center" src={mainImage} alt={this.props.artist.name} />
              <p>{this.props.artist.bio}</p>
            </div>
            <div className="gallery" dangerouslySetInnerHTML={{ __html: this.props.artist.content }} />
          </div>
        </div>
      );
    }
    return (
      <div className="artist" />
    );
  }
}
ArtistDetail.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
