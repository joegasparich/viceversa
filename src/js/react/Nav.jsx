import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/icons/Menu';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Facebook from 'mdi-material-ui/Facebook';
import Instagram from 'mdi-material-ui/Instagram';
import Headphones from 'mdi-material-ui/Headphones';

import Events from './Events';

const BREAK_SMALL = 480;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      eventsExpanded: false,
      eventsHeight: 0,
    };

    // References
    this.nav = React.createRef();
    this.navContent = React.createRef();
    this.events = React.createRef();
    this.collapseTop = React.createRef();
    this.collapseBottom = React.createRef();

    // Binds
    this.toggleExpandNav = this.toggleExpandNav.bind(this);
    this.toggleExpandEvents = this.toggleExpandEvents.bind(this);

  }

  componentDidMount() {
    this.nav.current.addEventListener('touchmove', e => e.preventDefault());
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
      <div className={`navigation ${this.state.expanded ? 'expanded' : ''}`} ref={this.nav}>
        <div className="background" />
        <div className="nav-head">
          <button id="menu" href="#" onClick={this.toggleExpandNav} ><Menu /></button>
          <Link to="/" id="brand-logo" />
          {/* <button id="top-mob" href="#" onClick={() => { window.scrollTo(0, 0); }} ><ArrowUpward /></button> */}
        </div>
        <div
          className="nav-content"
          ref={this.navContent}
          style={this.state.expanded ? this.navContent && this.navContent.current && {
            height: this.navContent.current.scrollHeight,
          } : {
            height: null,
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
              <li id="artists" className="link">
                <Link to="/artists" className={window.location.pathname.includes('artist') ? 'active' : ''} onClick={() => this.setState({ expanded: false })}>
                  Artists
                </Link>
              </li>
              <li id="shed" className="link">
                <Link to="/shed" className={window.location.pathname.includes('shed') ? 'active' : ''} onClick={() => this.setState({ expanded: false })}>
                  Shed
                </Link>
              </li>
              <li id="shop" className="link">
                <Link to="/shop" className={window.location.pathname.includes('shop') ? 'active' : ''} onClick={() => this.setState({ expanded: false })}>
                  Shop
                </Link>
              </li>
              <li id="about" className="link">
                <Link to="/about" className={window.location.pathname.includes('about') ? 'active' : ''} onClick={() => this.setState({ expanded: false })}>
                  About
                </Link>
              </li>
            </ul>

            <div className="break" />

            <div id="social-media">
              <a id="facebook" href="//www.facebook.com/viceversanz/"><Facebook /></a>
              <a id="instagram" href="//www.instagram.com/viceversa_nz/"><Instagram /></a>
              <a id="bandcamp" href="//bandcamp.com"><Headphones /></a>
            </div>
          </div>

          <div className="break" />

          <div
            className="events"
            ref={this.events}
            style={(this.state.eventsExpanded) ? {
              height: `${this.navContent.current.scrollHeight - 2}px`,
            } : {
              height: (this.state.eventsHeight > 0) && `${this.state.eventsHeight}px`,
            }}
          >
            <Events displayCount={this.state.eventsExpanded ? -1 : 3} />
          </div>

          <div className="break more">
            <button id="more" className="more" href="#" onClick={this.toggleExpandEvents}>{this.state.eventsExpanded ? 'Less' : 'More'}</button>
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
    );
  }
}
