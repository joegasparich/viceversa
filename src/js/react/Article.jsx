import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';

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

  componentDidMount() {
    if (this.props.open) {
      const el = this.articleRef.current;
      const pos = el.getBoundingClientRect();

      this.setState({
        open: this.props.open,
        startPos: pos,
      });
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

      this.props.history.push(`/articles/${this.props.article.id}`);

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
        this.setState({
          startPos: null,
        });
      }, 500);
    } else {
      // Article was in URL - close immediately
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
          <div style={this.state.startPos && { display: 'block' }}>
            <button id="close" onClick={this.close}><Close /></button>
            <h1>{this.props.article.title}</h1>
            <div className="article-date">{this.props.article.date.toDateString()}</div>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: this.props.article.content }} />
          </div>
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
  history: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};
Article.defaultProps = {
  startPos: null,
};
