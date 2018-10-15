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
			if(Date.parse(event.date) > Date.now() && (index < this.props.displayCount || this.props.displayCount < 0)) {
				index++;
				return (
					<li key={event._id}>
						<Event
							name={event.name}
							date={new Date(event.date)}
							description={event.description}
							link={event.link}
						/>
					</li>
				);
			}
		});

		return (
			<ul className="event-list">
				{eventList}
			</ul>
		);
	}
}