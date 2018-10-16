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
			articlePos: null
		};

		//Binds
		this.handleClick = this.handleClick.bind(this);
		this.closeArticle = this.closeArticle.bind(this);

		//Refs
		this.article = React.createRef();
	}

	componentDidMount() {
		this.setState({shownArticle: null});

		//Get Articles
		Queries.postRequest(
			{ query: Queries.article.getAll },
			(articles) => {
				const shownArticle = articles.data.articles.find(article => {return article._id == this.props.match.params.id}) || null;
				this.setState({
					articles: articles.data.articles.map(article => {
						return({
							_id: article._id,
							title: article.title,
							date: new Date(article.date),
							content: article.content
						});
					}),
					shownArticle: shownArticle ? {
						_id: shownArticle._id,
						title: shownArticle.title,
						date: new Date(shownArticle.date),
						content: shownArticle.content
					} : null
				});
			}
		);
	}

	componentWillReceiveProps(props) {
		this.setState({
			shownArticle: this.state.articles.find(article => {return article._id == props.match.params.id}),
		});
	}

	handleClick(params, domNode) {
		let element = ReactDOM.findDOMNode(domNode);
		let boundingBox = element.getBoundingClientRect();
		this.setState({
			articlePos: boundingBox
		});
	}

	closeArticle() {
		this.setState({
			shownArticle: null
		});
		this.props.history.push('/');
	}

	render() {

		let articleList = this.state.articles.map((article) =>
			<Square
				id={article._id}
				title={article.title}
				key={article._id}
				path={'/articles/' + article._id}
				click={{func: this.handleClick, params: {article: article}}}
			/>
		);

		return (
			<div className="news-feed">
				<Article 
					article={this.state.shownArticle}
					startPos={this.state.articlePos} 
					onClose={this.closeArticle}
					open={Boolean(this.state.shownArticle)}
				/>
				{articleList}
				<ul className="pagination"></ul>
			</div>
		);
	}
}