import React from 'react';
import PropTypes from 'prop-types';

export default class Event extends React.Component {
  render() {
    return (
      <a className="event" href={this.props.link}>
        <span className="event-name">
          {this.props.name}
        </span>
        <span className="event-date">{this.props.date.toDateString()}</span>
      </a>
    );
  }
}
Event.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  link: PropTypes.string,
};
Event.defaultProps = {
  link: '#',
};
