import React from "react";

import Event from "./Event";
import Queries from "../utils/Queries";

export default class Events extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: []
		};
	}

	componentDidMount() {
		Queries.postRequest({ query: Queries.event.getAll }, events => {
			if (!events.data.events) return;
			const sortedEvents = events.data.events.sort(
				(a, b) =>
					(a.date === "") - (b.date === "") ||
					a.date.localeCompare(b.date)
			);
			this.setState({
				events: sortedEvents
			});
		});
	}

	render() {
		let index = 0;

		const eventList = this.state.events.map(event => {
			// If date is either in the future or is TBA
			if (
				(event.date === "" || Date.parse(event.date) > Date.now()) &&
				(index < this.props.displayCount || this.props.displayCount < 0)
			) {
				index++;
				return (
					<li key={event.id}>
						<Event
							name={event.name}
							date={event.date ? new Date(event.date) : null}
							description={event.description}
							link={event.link}
						/>
					</li>
				);
			}
			return undefined;
		});

		if (eventList.length > 0) {
			return <ul className="event-list">{eventList}</ul>;
		}
		return <p>No upcoming events</p>;
	}
}
