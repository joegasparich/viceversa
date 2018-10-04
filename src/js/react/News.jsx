import React from 'react';
import Queries from '../utils/Queries';

import Square from './Square';
import Article from './Article';

export default class News extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			events: [],
			shownArticle: null
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

	handleClick(article) {
		this.setState({shownArticle: article});
	}

	closeArticle() {
		this.setState({
			shownArticle: null
		});
	}

	render() {
		if(this.state.shownArticle) {
			return (
				<Article 
					article={this.state.shownArticle}
					onClose={this.closeArticle}
				/>
			);
		}

		let articleList = this.state.articles.map((article) =>
			<Square
				title={article.title}
				key={article._id}
				click={() => {this.handleClick(article)}}
			/>
		);

		return (
			<div className="news-feed">
				{articleList}
				<ul className="pagination"></ul>
			</div>
		);
	}
}