import React from 'react';
import PropTypes from 'prop-types';

import Queries from '../utils/Queries';
import Article from './Article';

export default class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      shownArticle: null,
    };

    // Refs
    this.article = React.createRef();
  }

  componentDidMount() {
    // Get Articles
    Queries.postRequest(
      { query: Queries.article.getAll },
      (articles) => {
        const shownArticle = articles.data.articles.find(article => article.id === this.props.match.params.id) || null;
        this.setState({
          articles: articles.data.articles.map(article => ({
            id: article.id,
            title: article.title,
            date: new Date(article.date),
            content: article.content,
          })),
          shownArticle: shownArticle ? {
            id: shownArticle.id,
            title: shownArticle.title,
            date: new Date(shownArticle.date),
            content: shownArticle.content,
          } : null,
        });
      },
    );
  }

  componentWillReceiveProps(props) {
    this.setState({
      shownArticle: this.state.articles.find(article => article.id === props.match.params.id),
    });
  }

  render() {
    const articleList = this.state.articles.map(article =>
      (<Article
        key={article.id}
        article={article}
        onOpen={this.openArticle}
        onClose={this.closeArticle}
        open={Boolean(this.state.shownArticle && this.state.shownArticle.id === article.id)}
      />));

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
};
