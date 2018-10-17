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
      expandEvents: false,
      eventsExpanded: false,
      eventsHeight: 0,
    };

    // References
    this.collapseTop = React.createRef();
    this.collapseBottom = React.createRef();
    this.expand = React.createRef();
    this.navContent = React.createRef();

    // Binds
    this.toggleExpandNav = this.toggleExpandNav.bind(this);
    this.toggleExpandEvents = this.toggleExpandEvents.bind(this);
  }

  toggleExpandNav() {
    this.setState({
      expanded: !this.state.expanded,
    });

    if (this.state.expanded) {
      // Collapse
      this.collapseElement(this.navContent.current);
      this.navContent.current.addEventListener('transitionend', () => { this.navContent.current.style.height = null; }, { once: true });
    } else {
      // Expand
      this.expandElement(this.navContent.current);
    }
  }

  toggleExpandEvents() {
    this.setState({
      expandEvents: !this.state.expandEvents,
    });

    if (this.state.expandEvents) {
      // Expand other elements
      this.expandElement(this.collapseTop.current);
      this.collapseTop.current.addEventListener('transitionend', () => { this.collapseTop.current.style.height = null; }, { once: true });
      this.expandElement(this.collapseBottom.current);
      this.collapseBottom.current.addEventListener('transitionend', () => { this.collapseBottom.current.style.height = null; }, { once: true });

      // Collapse events
      const element = this.expand.current;
      const setExpanded = () => { this.setState({ eventsExpanded: false }); };
      element.style.height = `${this.state.eventsHeight}px`;

      element.addEventListener('transitionend', () => {
        element.style.height = null;
        setExpanded();
      }, { once: true });
    } else {
      this.setState({
        eventsHeight: this.expand.current.scrollHeight,
        eventsExpanded: true,
      });

      // Collapse other elements
      this.collapseElement(this.collapseTop.current);
      this.collapseElement(this.collapseBottom.current);

      // Expand events
      const element = this.expand.current;
      const startHeight = element.scrollHeight;
      const style = window.getComputedStyle(element);
      const margin = parseInt(style.getPropertyValue('margin-bottom')) + parseInt(style.getPropertyValue('margin-top'));
      const endHeight = this.navContent.current.scrollHeight - margin;
      const elementTransition = element.style.transition;
      element.style.transition = '';

      requestAnimationFrame(() => {
        element.style.height = `${startHeight}px`;
        element.style.transition = elementTransition;

        requestAnimationFrame(() => {
          element.style.height = `${endHeight}px`;
        });
      });
    }
  }

  collapseElement(element) {
    const sectionHeight = element.scrollHeight;
    const style = window.getComputedStyle(element);
    const elementTransition = style.getPropertyValue('transition');
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
  }

  expandElement(element) {
    const sectionHeight = element.scrollHeight;
    element.style.height = `${sectionHeight}px`;
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
          <div className="nav-content" ref={this.navContent}>
            <div className="collapsable" ref={this.collapseTop}>
              <ul className="links">
                <li id="artists" className="link"><Link to="/artists" className={window.location.pathname.includes('artist') ? 'active' : ''}>Artists</Link></li>
                <li id="shed" className="link"><Link to="/shed" className={window.location.pathname.includes('shed') ? 'active' : ''}>Shed</Link></li>
                <li id="shop" className="link"><a href="//bandcamp.com">Shop</a></li>
                <li id="about" className="link"><Link to="/about" className={window.location.pathname.includes('about') ? 'active' : ''}>About</Link></li>
              </ul>

              <div className="break" />

              <div id="social-media">
                <a id="facebook" href="//https://www.facebook.com/groups/819023558295629/"><Facebook /></a>
                <a id="instagram" href="//https://www.instagram.com/viceversa_nz/"><Instagram /></a>
                <a id="bandcamp" href="//bandcamp.com"><Headphones /></a>
              </div>
            </div>

            <div className="break" />

            <div className="events" ref={this.expand}>
              <Events displayCount={this.state.eventsExpanded ? -1 : 3} />
            </div>

            <div className="break">
              <button id="more" href="#" onClick={this.toggleExpandEvents}>{this.state.eventsExpanded ? 'Less' : 'More'}</button>
            </div>

            <div className="collapsable" ref={this.collapseBottom}>
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
