import React from 'react';

export default class Artist extends React.Component {

	render() {

		return (
			<div className='card-panel artist' onClick={() => { window.open(this.props.path, "_blank") }}>
				<h5 className='artist-name'>
					{this.props.name}
				</h5>
			</div>
		);
	}
}