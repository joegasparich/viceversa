import React from 'react';
import Queries from '../utils/Queries';

import Square from './Square'

export default class Home extends React.Component {

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
		// 	query: Queries.event.create,
		// 	variables: {
		// 		name: "Sauce EP Release",
		// 		date: new Date(),
		// 		description: "Description",
		// 		link: "www.google.com"
		// 	}
		// })
	}

	render() {
		let articleList = this.state.articles.map(article =>
			<Square 
				key={article._id}
				title={article.title}
			/>
		);

		return (
			<div className="row">
				<div id="news-feed">
					{articleList}
				</div>
				<ul className="pagination"></ul>
			</div>
		);
	}
}