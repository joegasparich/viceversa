import React from 'react';

export default class Artists extends React.Component {

	render() {

		return (
			<div className="artist">
				<h2 className="center">Te Henga Collective</h2>
				<div className="content row">
					<div className="bio col s3">
						<p>Insert Bio Here</p>
					</div>
					<div className="gallery col s9 pull-s3">
						<p>Gallery</p>
					</div>
				</div>
			</div>
		);
	}
}