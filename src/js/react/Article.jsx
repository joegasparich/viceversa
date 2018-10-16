import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper';

export default class Article extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		};

		//Binds
		this.close = this.close.bind(this);

		//Refs
		this.articleRef = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.article != this.props.article) {
			if (this.props.startPos) {
				//Animate open
				setTimeout(() => {
					this.setState({
						open: this.props.open
					});
				}, 10);
			} else {
				//Article in URL - open immediately
				this.setState({
					open: this.props.open
				});
			}
		}
	}

	close() {
		this.setState({
			open: false
		});
		if (this.props.startPos) {
			//Animate close
			setTimeout(() => {
				this.props.onClose();
			}, 400);
		} else {
			//Article was in URL - close immediately
			this.props.onClose();
		}
	}

	render() {
		if (this.props.article) {
			let pos = this.props.startPos;

			return (
				<div
					className={`article ${this.state.open ? 'open' : ''}`}
					ref={this.articleRef}
					style={pos && {
						top: pos.top + "px",
						left: pos.left + "px",
						width: pos.width + "px",
						height: pos.height + "px",
						display: "block"
					}}
				>
					<Paper elevation={4}>
						<div id="close" onClick={this.close}><Close /></div>
						<h1 className="article-title">{this.props.article.title}</h1>
						<div className="article-date">{this.props.article.date.toDateString()}</div>
						<div className="article-content" dangerouslySetInnerHTML={{ __html: this.props.article.content }}></div>
					</Paper>
				</div>
			);
		}
		return (
			<div />
		);
	}
}
Article.propTypes = {
	article: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		date: PropTypes.instanceOf(Date),
		content: PropTypes.string
	}),
	startPos: PropTypes.object,
	onClose: PropTypes.func
}