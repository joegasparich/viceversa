import React from 'react';
import PropTypes from 'prop-types';

export default class ArtistDetail extends React.Component {

    render() {
        if (this.props.artist) {

            let mainImage = "";
            let bannerImage = "";

            try {
                mainImage = require(`../../resources/images/artists/${this.props.artist._id}/main.jpg`);
                bannerImage = require(`../../resources/images/artists/${this.props.artist._id}/banner.jpg`);
            } catch(error) {}

            return (
                <div className="artist">
                    <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
                        <h1 className="center">{this.props.artist.name}</h1>
                    </div>
                    <div className="content">
                        <div className="bio">
                            <h3 className="center">Bio</h3>
                            <img className="center" src={mainImage} />
							<p>{this.props.artist.bio}</p>
                        </div>
                        <div className="gallery" dangerouslySetInnerHTML={{__html: this.props.artist.content}}></div>
                    </div>
                </div>
            );
        }
        return (
            <div className="artist">
            </div>
        );
    }
}
ArtistDetail.propTypes = {
    artist: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        bio: PropTypes.string,
        content: PropTypes.string
    })
}