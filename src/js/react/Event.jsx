import React from 'react';

export default class Event extends React.Component {

	render() {

		const isOld = this.props.date < Date.now();

		return (
			<div className='event' onClick={() => {window.open(this.props.link, "_blank")}}>
				<span className='event-name'>
					{this.props.name}
				</span>
				<span className='event-date'>{this.props.date.toDateString()}</span>
			</div>
		);
	}
}
