import React from 'react';
import ReactDOM from 'react-dom';
import Queries from '../utils/Queries';

import Square from './Square';
import Article from './Article';

export default class News extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			events: [],
			shownArticle: null,
			articlePos: {}
		};

		//Binds
		this.handleClick = this.handleClick.bind(this);
		this.closeArticle = this.closeArticle.bind(this);
	}

	componentDidMount() {
		this.setState({shownArticle: null});

		//Get Articles
		Queries.postRequest(
			{ query: Queries.article.getAll },
			(articles) => {
				this.setState({
					articles: articles.data.articles.map(article => {
						return({
							_id: article._id,
							title: article.title,
							date: new Date(article.date),
							content: article.content
						});
					})
				});
			}
		);
	}

	handleClick(params, domNode) {
		let element = ReactDOM.findDOMNode(domNode);
		let boundingBox = element.getBoundingClientRect();
		this.setState({
			shownArticle: params.article,
			articlePos: boundingBox
		});
	}

	closeArticle() {
		this.setState({
			shownArticle: null
		});
	}

	render() {

		let articleList = this.state.articles.map((article) =>
			<Square
				id={article._id}
				title={article.title}
				key={article._id}
				click={{func: this.handleClick, params: {article: article}}}
			/>
		);

		return (
			<div className="news-feed">
				{this.state.shownArticle && <Article article={this.state.shownArticle} startPos={this.state.articlePos} onClose={this.closeArticle}/>}
				{articleList}
				<ul className="pagination"></ul>
			</div>
		);
	}
}