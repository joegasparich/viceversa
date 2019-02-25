import React from "react";

import Queries from "../utils/Queries";
import Article from "./Article";

export default class News extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			shownArticleId: -1
		};
	}

	componentDidMount() {
		setTimeout(
			() => {
				//Get articles - delayed if entry animation if playing
				Queries.postRequest(
					{ query: Queries.article.getAll },
					articles => {
						if (!articles.data.articles) return; //Don't update page if no articles are received

						//Sort in reverse chronological order
						const sortedArticles = articles.data.articles.sort(
							(a, b) => b.date.localeCompare(a.date)
						);

						this.setState({
							articles: sortedArticles.map(article => ({
								id: article.id,
								title: article.title,
								date: new Date(article.date),
								content: article.content,
								image: article.image,
								animation: article.animation
							})),
							shownArticleId: this.props.match.params.id
						});
					}
				);
			},
			this.props.delayLoad ? 1500 : 100
		);
	}

	componentWillReceiveProps(props) {
		//Show article from url
		this.setState({
			shownArticleId: this.state.articles.find(
				article => article.id === props.match.params.id
			)
		});
	}

	render() {
		//Create article elements
		const articleList = this.state.articles.map(article => {
			//Return image if gif
			if (article.animation) {
				return <img key={article.id} src={article.image} />;
			}

			return (
				<Article
					key={article.id}
					article={article}
					image={article.image}
					history={this.props.history}
					open={Boolean(this.state.shownArticleId === article.id)}
				/>
			);
		});

		return (
			<div className="news-feed">
				{articleList}
				<ul className="pagination" />
			</div>
		);
	}
}
