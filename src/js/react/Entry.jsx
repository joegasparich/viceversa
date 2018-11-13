import React from 'react';
import PropTypes from 'prop-types';

export default class Entry extends React.Component {
  render() {
    return (
      <div id="entry-modal" className="active">
        <div id="entry-content" className="valign-wrapper">
          <div className="center">
            <div className="enter" onClick={() => this.props.onClear() }>
              <div className="brand-logo" />
              <h2>Enter</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Entry.propTypes = {
  onClear: PropTypes.func.isRequired,
};
