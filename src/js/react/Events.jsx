import React from 'react';
import PropTypes from 'prop-types';

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
          events: events.data.events,
        });
      },
    );
  }

  render() {
    let index = 0;

    const eventList = this.state.events.map((event) => {
      if (Date.parse(event.date) > Date.now() && (index < this.props.displayCount || this.props.displayCount < 0)) {
        index++;
        return (
          <li key={event.id}>
            <Event
              name={event.name}
              date={new Date(event.date)}
              description={event.description}
              link={event.link}
            />
          </li>
        );
      }
      return undefined;
    });

    return (
      <ul className="event-list">
        {eventList}
      </ul>
    );
  }
}
Events.propTypes = {
  displayCount: PropTypes.number,
};
Events.defaultProps = {
  displayCount: -1,
};
