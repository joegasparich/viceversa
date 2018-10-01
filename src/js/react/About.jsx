import React from 'react';

export default class News extends React.Component {

	render() {
		return (
			<div className="about">
				<h2 className="center">About</h2>
				<div className="content">
					<div className="bio">
						<p>Insert Bio Here</p>
					</div>
					<div className="contact">
						<p>Contact</p>
					</div>
				</div>
			</div>
		);
	}
}