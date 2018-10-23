import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/icons/Menu';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Facebook from 'mdi-material-ui/Facebook';
import Instagram from 'mdi-material-ui/Instagram';
import Headphones from 'mdi-material-ui/Headphones';

import Events from './Events';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      eventsExpanded: false,
      eventsHeight: 0,
    };

    // References
    this.navContent = React.createRef();
    this.events = React.createRef();
    this.collapseTop = React.createRef();
    this.collapseBottom = React.createRef();

    // Binds
    this.toggleExpandNav = this.toggleExpandNav.bind(this);
    this.toggleExpandEvents = this.toggleExpandEvents.bind(this);
  }

  toggleExpandNav() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  toggleExpandEvents() {
    if (!this.state.eventsExpanded) {
      this.setState({
        eventsHeight: this.events.current.scrollHeight,
      });
    }

    setTimeout(() => {
      this.setState({
        eventsExpanded: !this.state.eventsExpanded,
      });
    }, 10);
  }

  render() {
    return (
      <div>
        <div className="navigation">
          <div className="nav-head">
            <button id="menu" href="#" onClick={this.toggleExpandNav} ><Menu /></button>
            <Link to="/" id="brand-logo" />
            <button id="top-mob" href="#" onClick={() => { window.scrollTo(0, 0); }} ><ArrowUpward /></button>
          </div>
          <div
            className="nav-content"
            ref={this.navContent}
            style={this.state.expanded ? this.navContent && this.navContent.current && {
              height: this.navContent.current.scrollHeight,
            } : {
              height: '0px',
            }}
          >
            <div
              className="collapsable"
              ref={this.collapseTop}
              style={this.state.eventsExpanded ? {
                height: '0',
              } : this.collapseTop && this.collapseTop.current && {
                height: this.collapseTop.current.scrollHeight,
              }}
            >
              <ul className="links">
                <li id="artists" className="link"><Link to="/artists" className={window.location.pathname.includes('artist') ? 'active' : ''}>Artists</Link></li>
                <li id="shed" className="link"><Link to="/shed" className={window.location.pathname.includes('shed') ? 'active' : ''}>Shed</Link></li>
                <li id="shop" className="link"><a href="//bandcamp.com">Shop</a></li>
                <li id="about" className="link"><Link to="/about" className={window.location.pathname.includes('about') ? 'active' : ''}>About</Link></li>
              </ul>

              <div className="break" />

              <div id="social-media">
                <a id="facebook" href="//www.facebook.com/groups/819023558295629/"><Facebook /></a>
                <a id="instagram" href="//www.instagram.com/viceversa_nz/"><Instagram /></a>
                <a id="bandcamp" href="//bandcamp.com"><Headphones /></a>
              </div>
            </div>

            <div className="break" />

            <div
              className="events"
              ref={this.events}
              style={(this.state.eventsExpanded) ? {
                height: `${this.navContent.current.scrollHeight}px`,
              } : {
                height: (this.state.eventsHeight > 0) && `${this.state.eventsHeight}px`,
              }}
            >
              <Events displayCount={this.state.eventsExpanded ? -1 : 3} />
            </div>

            <div className="break">
              <button id="more" href="#" onClick={this.toggleExpandEvents}>{this.state.eventsExpanded ? 'Less' : 'More'}</button>
            </div>

            <div
              className="collapsable"
              ref={this.collapseBottom}
              style={this.state.eventsExpanded ? {
                height: '0',
              } : this.collapseBottom && this.collapseBottom.current && {
                height: this.collapseBottom.current.scrollHeight,
              }}
            >
              <div id="top">
                <button href="#" onClick={() => { window.scrollTo(0, 0); }}>Top</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
