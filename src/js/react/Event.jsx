import React from 'react';

export default class Event extends React.Component {

	render() {

		const isOld = this.props.date < Date.now();

		if (this.props.isCompact) {
			return (
				<tr className='event-compact' onClick={() => {window.open(this.props.link, "_blank")}}>
					<td className='event-name'>
						{this.props.name}
					</td>
					<td className='event-date'>{this.props.date.toDateString()}</td>
				</tr>
			);
		} else {
			return (
				<div className={isOld ? ('event card-panel grey lighten-3') : ('event card-panel')}>
					<span className='date'>{this.props.date.toDateString()}</span>
					<a href={this.props.link}><h5>{this.props.name}</h5></a>
					<p>{this.props.description}</p>
				</div>
			);
		}
	}
}
