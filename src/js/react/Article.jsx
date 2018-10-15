import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper';

export default class Article extends React.Component {

	constructor(props) {
		super(props);

		//Binds
		this.close = this.close.bind(this);

		//Refs
		this.articleRef = React.createRef();
	}

	componentDidUpdate() {
		//Animate open
		let element = this.articleRef.current;
		if (element && this.props.startPos && !element.classList.contains('open')) {
			let pos = this.props.startPos;

			element.style = `
				--article-square-top: ${pos.top}px;
				--article-square-left: ${pos.left}px;
				--article-square-size: ${pos.width}px;
				display: block;
			`;

			setTimeout(() => {
				element.classList.add('open');
			}, 10);
		}
	}

	close() {
		//Animate Close
		let element = this.articleRef.current;
		if (element && this.props.startPos && element.classList.contains('open')) {
			element.classList.remove('open');

			let pos = this.props.startPos;
			element.style = `
				--article-square-top: ${pos.top}px;
				--article-square-left: ${pos.left}px;
				--article-square-size: ${pos.width}px;
				display: block;
			`;

			setTimeout(() => {
				element.style = '';
				this.props.onClose()
			}, 300);
		} else {
			this.props.onClose()
		}
	}

	render() {
		if (this.props.article) {
			return (
				<div className="article" ref={this.articleRef}>
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
			<div className="article"></div>
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