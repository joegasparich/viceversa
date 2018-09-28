import React from 'react';
import Event from './Event';
import Queries from '../utils/Queries';

export default class Events extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events: [],
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
		let index = 0;

		let eventList = this.state.events.map(event => {
			if(index < this.props.displayCount || this.props.displayCount < 0) {
				index++;
				return (
					<Event
						key={event._id}
						name={event.name}
						date={new Date(event.date)}
						description={event.description}
						link={event.link}
					/>
				);
			}
		});

		return (
			<div className="event-list">
				{eventList}
			</div>
		);
	}
}