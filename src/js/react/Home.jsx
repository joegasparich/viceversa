import React from 'react';
import Event from './Event';
import Queries from '../utils/Queries';

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
		//Get Events
		Queries.postRequest(
			{ query: Queries.event.getAll },
			(events) => {
				this.setState({
					events: events.data.events
				});
			}
		);

		// Queries.postRequest({
		// 	query: Queries.article.create,
		// 	variables: {
		// 		title: "Article",
		// 		date: new Date(),
		// 		content: "<h1>Test</h1>"
		// 	}
		// })
	}

	render() {
		let eventList = this.state.events.map(event =>
			<Event
				key={event._id}
				name={event.name}
				date={new Date(event.date)}
				link={event.link}
				isCompact
			/>
		);

		let articleList = this.state.articles.map(article =>
			<article key={article._id} className="article card-panel">
				<h5>{article.title}</h5>
				<div className="article-content" dangerouslySetInnerHTML={{__html: article.content}} />
			</article>
		);

		return (
			<div className="row">
				<div className="compact-event-list col m4 push-m8 s12">
					<div className="card-panel">
						<h5 className="center"><a href="/events">Upcoming Events</a></h5>
						<table>
							<tbody>
								{eventList}
							</tbody>
						</table>
					</div>
				</div>
				<div className="col m8 pull-m4 s12">
					<div id="news-feed">
						{articleList}
					</div>
					<ul className="pagination"></ul>
				</div>
			</div>
		);
	}
}