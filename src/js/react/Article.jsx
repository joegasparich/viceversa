import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper';

export default class Article extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.article) {
			return (
				<Paper elevation={4} className="article">
					<div id="close" onClick={this.props.onClose}><Close /></div>
					<h1 className="article-title">{this.props.article.title}</h1>
					<div className="article-date">{this.props.article.date.toDateString()}</div>
					<div className="article-content">{this.props.article.content}</div>
				</Paper>
			);
		}
		return (
			<div className="article">
				No Article Selected
			</div>
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
	onClose: PropTypes.func
}