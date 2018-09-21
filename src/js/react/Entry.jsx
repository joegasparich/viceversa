import React from 'react';

export default class Entry extends React.Component {

	render() {
		return (
			<div id="entry-modal" className="active">
				<div id="entry-content" className="valign-wrapper">
					<h1 onClick={this.props.onClear}><p id="vice">vice</p><p id="versa">versa</p></h1>
				</div>
			</div>
		);
	}
}