import React from "react";

export default class ArtistDetail extends React.Component {
	constructor(props) {
		super(props);

		this.artistRef = React.createRef();
	}

	render() {
		if (this.props.artist) {
			let mainImage = "";
			let bannerImage = "";

			try {
				mainImage = require(`../../resources/images/artists/${
					this.props.artist.name
				}/main.jpg`);
				bannerImage = require(`../../resources/images/artists/${
					this.props.artist.name
				}/banner.jpg`);
			} catch (error) {
				console.warn(
					`Could not find images for ${this.props.artist.name}`
				);
			}

			const linkList = this.props.artist.links.map(link => (
				<li key={link.title}>
					<a href={link.url}>{link.title}</a>
				</li>
			));

			return (
				<div className="artist" ref={this.artistRef}>
					<div className="artist-content">
						<div className="bio">
							<img
								className="center"
								src={mainImage}
								alt={this.props.artist.name}
							/>
							<h2 className="center">{this.props.artist.name}</h2>
							<p>{this.props.artist.bio}</p>
							<ul className="links">{linkList}</ul>
						</div>
						<div className="gallery">
							<div className="artist-banner">
								<img
									src={bannerImage}
									alt={this.props.artist.name}
								/>
							</div>
							<div
								dangerouslySetInnerHTML={{
									__html: this.props.artist.content
								}}
							/>
						</div>
					</div>
				</div>
			);
		}
		return <div className="artist" />;
	}
}
