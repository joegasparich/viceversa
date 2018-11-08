import React from 'react';
import PropTypes from 'prop-types';

import Queries from '../utils/Queries';
import Article from './Article';

export default class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      shownArticleId: -1,
    };

    // Refs
    this.article = React.createRef();
  }

  componentDidMount() {
    // Get Articles
    Queries.postRequest(
      { query: Queries.article.getAll },
      (articles) => {
        if (!articles.data.articles) return;
        const sortedArticles = articles.data.articles.sort((a, b) => b.date.localeCompare(a.date));
        this.setState({
          articles: sortedArticles.map(article => ({
            id: article.id,
            title: article.title,
            date: new Date(article.date),
            content: article.content,
          })),
          shownArticleId: this.props.match.params.id,
        });
      },
    );
  }

  componentWillReceiveProps(props) {
    this.setState({
      shownArticleId: this.state.articles.find(article => article.id === props.match.params.id),
    });
  }

  render() {
    const articleList = this.state.articles.map((article) => {
      let image = '';
      try {
        image = require(`../../resources/images/articles/${article.title}/main.jpg`);
      } catch (error) {
        console.warn(`Could not find images for ${article.title}`);
      }

      return (
        <Article
          key={article.id}
          article={article}
          image={image}
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
News.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
