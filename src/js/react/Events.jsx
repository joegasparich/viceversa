import React from 'react';
import Event from './Event';
import Queries from '../utils/Queries';

export default class Events extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events: []
		};
	}

	componentDidMount() {
		Queries.postRequest(
			{ query: Queries.event.getAll },
			(events) => {
				this.setState({
					events: events.data.events
				});
			}
		);

	}

	render() {
		let eventList = this.state.events.map(event =>
			<li key={event._id}>
				<Event
					name={event.name}
					date={new Date(event.date)}
					description={event.description}
					link={event.link}
					artists={[]}
				/>
			</li>
		);

		return (
			<div className="row">
				<h4 className="center">Upcoming Events</h4>
				<ul className="event-list">
					{eventList}
				</ul>
			</div>
		);
	}
}