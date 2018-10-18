import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      startPos: null,
    };

    // Binds
    this.close = this.close.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // Refs
    this.articleRef = React.createRef();
  }

  componentWillReceiveProps(props) {
    if (this.props.article === null && props.article !== null) {
      if (props.startPos) {
        // Animate open
        setTimeout(() => {
          this.setState({
            open: props.open,
          });
        }, 10);
      } else {
        // Article in URL - open immediately
        this.setState({
          open: props.open,
        });
      }
    }
  }

  handleHover(hovering) {
    this.setState({
      isHovered: hovering,
    });
  }

  handleClick() {
    if (!this.state.open) {
      // Open if closed
      const el = this.articleRef.current;
      const pos = el.getBoundingClientRect();

      this.setState({
        startPos: pos,
      }, () => {
        setTimeout(() => {
          this.setState({
            open: true,
          });
        }, 1);
      });
    }
  }

  close() {
    this.setState({
      open: false,
    });
    if (this.state.startPos) {
      // Animate close
      setTimeout(() => {
        this.props.onClose();
        this.setState({
          startPos: null,
        });
      }, 500);
    } else {
      // Article was in URL - close immediately
      this.props.onClose();
      this.setState({
        startPos: null,
      });
    }
    this.props.history.push('/');
  }

  render() {
    return (
      <div
        className={`article ${this.state.open ? 'open' : ''}`}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
      >
        <div
          className="card-panel"
          ref={this.articleRef}
          style={this.state.startPos && {
            top: `${this.state.startPos.top}px`,
            left: `${this.state.startPos.left}px`,
            width: `${this.state.startPos.width}px`,
            height: `${this.state.startPos.height}px`,
            position: 'fixed',
          }}
        >
          <Paper
            elevation={4}
            style={this.state.startPos && {
              display: 'block',
            }}
          >
            <button id="close" onClick={this.close}><Close /></button>
            <h1>{this.props.article.title}</h1>
            <div className="article-date">{this.props.article.date.toDateString()}</div>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: this.props.article.content }} />
          </Paper>
        </div>
        <div className={`article-title valign-wrapper ${this.state.isHovered ? 'show' : ''}`}>
          <h3>{this.props.article.title}</h3>
        </div>
      </div>
    );
  }
}
Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    content: PropTypes.string,
  }).isRequired,
  startPos: PropTypes.instanceOf(DOMRect),
  onClose: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};
Article.defaultProps = {
  startPos: null,
};
