import React from 'react';
import PropTypes from 'prop-types';

export default class Entry extends React.Component {
  render() {
    return (
      <div id="entry-modal" className="active">
        <div id="entry-content" className="valign-wrapper">
          <div className="center">
            <button className="brand-logo" onClick={() => { if (document.querySelector('#passcode').value === 'buckysaturday') this.props.onClear(); }} />
            <p><input type="password" id="passcode" className="center" placeholder="Passcode" /></p>
          </div>
        </div>
      </div>
    );
  }
}
Entry.propTypes = {
  onClear: PropTypes.func.isRequired,
};
