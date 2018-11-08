import React from 'react';
import Cookie from 'js-cookie';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from 'react-hot-loader';

import Entry from './Entry';
import Nav from './Nav';
import News from './News';
import About from './About';
import Artists from './Artists';
import Shed from './Shed';
import Shop from './Shop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSeenEntry: Boolean(Cookie.get('HasSeenEntry')),
    };

    this.onClear = this.onClear.bind(this);
  }
  onClear() {
    this.setState({
      hasSeenEntry: true,
    });
    Cookie.set('HasSeenEntry', true);
  }

  render() {
    if (!this.state.hasSeenEntry) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Entry onClear={this.onClear} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <header />
        <main>
          <div className="background" />
          <div className="nav">
            <Nav />
          </div>
          <div className="content">
            <Switch location={this.props.location}>
              <Route path="/artists/:id?" component={Artists} />
              <Route path="/about" component={About} />
              <Route path="/shed" component={Shed} />
              <Route path="/shop" component={Shop} />
              <Route path="/articles/:id?" component={News} />
              <Route path="/" component={News} />
            </Switch>
          </div>
        </main>
        <footer />
      </React.Fragment>
    );
  }
}
App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(hot(module)(App));
