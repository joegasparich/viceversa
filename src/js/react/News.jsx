import React from 'react';
import Queries from '../utils/Queries';

import Square from './Square'
import { stringify } from 'querystring';

export default class News extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			events: []
		};
	}

	componentDidMount() {
		//Get Articles
		Queries.postRequest(
			{ query: Queries.article.getAll },
			(articles) => {
				this.setState({
					articles: articles.data.articles
				});
			}
		);

		// Queries.postRequest({
		// 	query: Queries.article.create,
		// 	variables: {
		// 		title: "Article",
		// 		date: new Date(),
		// 		content: "Description",
		// 	}
		// })
	}

	render() {
		let articleList = this.state.articles.map((article) =>
			<Square
				title={article.title}
				key={article._id}
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