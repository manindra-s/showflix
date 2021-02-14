import axios from 'axios'

/* Base URL*/
const INIT_URL = 'http://api.tvmaze.com/shows'

/* Search URL*/
const SEARCH_URL = 'http://api.tvmaze.com/search/shows'

/* To fetch all shows */
export function allShows() {
    return axios.get(INIT_URL);
}

/* To fetch the relevant show details based on the id */
export function showDetails(id) {
    return axios.get(INIT_URL + '/' + id);
}

/* To fetch the cast details of a show based on the id */
export function castDetails(id) {
    return axios.get(INIT_URL + '/' + id + '/cast');
}

/* To fetch the season details of a show based on the id */
export function seasonDetails(id) {
    return axios.get(INIT_URL + '/' + id + '/seasons');
}

/* To fetch the relevant show details based on the search query */
export function showSearch(query) {
    return axios.get(SEARCH_URL + '?q=' + query);
}
