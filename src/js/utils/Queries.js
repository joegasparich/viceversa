import md5 from 'md5';
import LRU from 'lru-cache';

export default class Queries {
	static get cache() {
		if (!this.lru_cache) {
			this.lru_cache = LRU({
				max: 10,
			});
		}
		return this.lru_cache;
	}

	/**
   * Returns a promise of query results
   * @param {object} query_data GraphQL query data
   */
	static postRequest(query_data, callback = () => { }) {
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
			xhr.send(JSON.stringify(query_data));
		});
	}

	/**
	   * Posts a request and returns an early cached result if available
	   * @param {object} query_data GraphQL query data
	   * @param {func} callback Callback to receieve server or cached response
	   */
	static postCachedRequest(query_data, callback) {
		const cache_key = md5(JSON.stringify(query_data));
		const cache_item = this.cache.get(cache_key);
		if (cache_item) {
			callback(cache_item);
		}
		this.postRequest(query_data).then((result) => {
			this.cache.set(cache_key, result);
			callback(result);
		});
	}

	static get event() {
		return {
			getAll: `{
                events {
					_id
                    name
                    date
                    description
                    link
                    artists {
						name
					}
                }
            }`,
			create: `mutation createEvent($name: String!, $date: Date!, $description: String, $link: String!, $artists: [String]){
				createEvent(name: $name, date: $date, description: $description, link: $link, artists: $artists) {
                    _id
                }
            }`//,
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
					_id
                    title
                    date
                    content
                }
            }`,
			create: `mutation createArticle($title: String!, $date: Date!, $content: String!){
				createArticle(title: $title, date: $date, content: $content) {
                    _id
                }
            }`//,
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
					_id
                    name
					bio
					path
                }
            }`,
			create: `mutation createArtist($name: String!, $bio: String!, $path: String!){
				createArtist(name: $name, bio: $bio, path: $path) {
                    _id
                }
            }`//,
			// update: `mutation updateBillingItem($_id: String!, $name: String!, $type: String!, $startDate: Date!, $endDate: Date, $amount: Float!){
            //     updateBillingItem(_id: $_id, name: $name, type: $type, startDate: $startDate, endDate: $endDate, amount: $amount)
            // }`,
			// delete: `mutation deleteBillingItem($_id: String!){
            //     deleteBillingItem(_id: $_id)
            // }`,
		};
	}


}
