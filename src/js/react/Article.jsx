import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper';

export default class Article extends React.Component {

	constructor(props) {
		super(props);

		//Refs
		this.articleRef = React.createRef();
	}

	componentDidMount() {
		let element = this.articleRef.current;
		let pos = this.props.startPos;

		const style = window.getComputedStyle(element)
		let elementTransition = style.getPropertyValue('transition');
		element.style.transition = '';

		requestAnimationFrame(function () {
			element.style.left = pos.left + 'px';
			element.style.top = pos.top + 'px';
			element.style.width = pos.width + 'px';
			element.style.height = pos.height + 'px';
			element.style.transition = elementTransition;

			requestAnimationFrame(function () {
				if(window.innerWidth < 900) {
					element.style.left = "5%";
					element.style.width = "90%";
					element.style.top = "140px";
				} else {
					element.style.left = "30%";
					element.style.width = "65%";
					element.style.top = "5%";
				}
				element.style.height = element.scrollHeight;
			});
		});
	}

	render() {
		if (this.props.article) {
			return (
				<div className="article" ref={this.articleRef}>
					<Paper elevation={4}>
						<div id="close" onClick={this.props.onClose}><Close /></div>
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