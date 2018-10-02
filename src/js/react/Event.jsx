import React from 'react';
import PropTypes from 'prop-types';

export default class Event extends React.Component {

	render() {

		const isOld = this.props.date < Date.now();

		return (
			<a className='event' href={this.props.link}>
				<span className='event-name'>
					{this.props.name}
				</span>
				<span className='event-date'>{this.props.date.toDateString()}</span>
			</a>
		);
	}
}
Event.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string,
	date: PropTypes.instanceOf(Date)
}