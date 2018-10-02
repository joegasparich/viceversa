import React from 'react';
import PropTypes from 'prop-types';

export default class Entry extends React.Component {
	render() {
		return (
			<div id="entry-modal" className="active">
				<div id="entry-content" className="valign-wrapper">
					<div className="brand-logo" onClick={this.props.onClear}></div>
				</div>
			</div>
		);
	}
}
Entry.propTypes = {
	onClear: PropTypes.func.isRequired
}