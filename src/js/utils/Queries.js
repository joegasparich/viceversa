import md5 from 'md5';
import LRU from 'lru-cache';

export default class Queries {
  static get cache() {
    if (!this.lruCache) {
      this.lruCache = LRU({
        max: 10,
      });
    }
    return this.lruCache;
  }

  static postRequest(queryData, callback = () => { }) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/graphql');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status === 200 && xhr.response) {
          const response = JSON.parse(xhr.response);
          callback(response);
          resolve(response);
        } else if (xhr.status !== 200) {
          reject(xhr.response);
          throw xhr.response;
        }
      };
      xhr.send(JSON.stringify(queryData));
    });
  }

  static postCachedRequest(queryData, callback) {
    const cacheKey = md5(JSON.stringify(queryData));
    const cacheItem = this.cache.get(cacheKey);
    if (cacheItem) {
      callback(cacheItem);
    }
    this.postRequest(queryData).then((result) => {
      this.cache.set(cacheKey, result);
      callback(result);
    });
  }

  static get event() {
    return {
      getAll: `{
        events {
          id: _id
          name
          date
          description
          link
        }
      }`,
      // create: `mutation createEvent($name: String!, $date: Date!, $description: String, $link: String!){
      //   createEvent(name: $name, date: $date, description: $description, link: $link) {
      //     _id
      //   }
      // }`,
      // update: `mutation updateBillingItem($_id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
      //     updateBillingItem(_id: $_id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
      // }`,
      // delete: `mutation deleteBillingItem($_id: String!){
      //     deleteBillingItem(_id: $_id)
      // }`,
    };
  }

  static get article() {
    return {
      getAll: `{
        articles {
          id: _id
          title
          date
          content
          image
        }
      }`,
      // create: `mutation createArticle($title: String!, $date: Date!, $content: String!){
      //   createArticle(title: $title, date: $date, content: $content) {
      //     _id
      //   }
      // }`,
      // update: `mutation updateBillingItem($_id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
      //     updateBillingItem(_id: $_id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
      // }`,
      // delete: `mutation deleteBillingItem($_id: String!){
      //     deleteBillingItem(_id: $_id)
      // }`,
    };
  }

  static get artist() {
    return {
      getAll: `{
        artists {
          id: _id
          name
          bio
          content
          url
          links {
            title
            url
          }
          showTitle
        }
      }`,
      // create: `mutation createArtist($name: String!, $bio: String!, $content: String!){
      //   createArtist(name: $name, bio: $bio, content: $content) {
      //     _id
      //   }
      // }`,
      // update: `mutation updateBillingItem($_id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
      //     updateBillingItem(_id: $_id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
      // }`,
      // delete: `mutation deleteBillingItem($_id: String!){
      //     deleteBillingItem(_id: $_id)
      // }`,
    };
  }
}
