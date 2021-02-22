import axios from 'axios'

/* Base URL*/
const INIT_URL = 'https://api.tvmaze.com/'

/* To fetch all shows */
export function fetchAllShows() {
    return axios.get(`${INIT_URL}shows`);
}

/* To fetch the relevant show details based on the id */
export function fetchShowDetails(id) {
    return axios.get(`${INIT_URL}shows/${id}`);
}

/* To fetch the cast details of a show based on the id */
export function fetchCastDetails(id) {
    return axios.get(`${INIT_URL}shows/${id}/cast`);
}

/* To fetch the season details of a show based on the id */
export function fetchSeasonDetails(id) {
    return axios.get(`${INIT_URL}shows/${id}/seasons`);
}

/* To fetch the relevant show details based on the search query */
export function fetchShowSearch(query) {
    return axios.get(`${INIT_URL}search/shows?q=${query}`);
}
