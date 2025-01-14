import Api from './api.js';

const fetchData = async (endpoint, params = {}) => {
  return await Api.get(endpoint, params);
};

// Fonction pour obtenir les films tendance
export const getTrending = async (payload) => fetchData('/movies/trending/movie/week', payload);

// Fonction pour obtenir les films populaires
export const getPopular = async (payload) => fetchData('/movies/movie/popular', payload);

// Fonction pour obtenir les films à venir
export const getUpcoming = async (payload) => fetchData('/movies/movie/upcoming', payload);

// Fonction pour rechercher un film ou une série (ajustée pour correspondre à vos paramètres)
export const searchFilm = async (query) => fetchData(`/movies/search/movie`, { query });

// Fonction pour obtenir les détails d'un film ou d'une série
export const getDetail = async (type, id, payload) =>
  fetchData(`/movies/${type}/${id}`, payload);

// Fonction pour obtenir les crédits d'un film ou d'une série
export const getCredits = async (type, id, payload) =>
  fetchData(`/movies/${type}/${id}/credits`, payload);

// Fonction pour obtenir les trailers d'un film ou d'une série
export const getTrailers = async (type, id, payload) =>
  fetchData(`/movies/${type}/${id}/trailers`, payload);

// Fonction pour obtenir les critiques d'un film ou d'une série
export const getReviews = async (type, id, payload) =>
  fetchData(`/movies/${type}/${id}/reviews`, payload);

// Fonction pour obtenir des recommandations pour un film ou une série
export const getRecommendation = async (type, id, payload) =>
  fetchData(`/movies/${type}/${id}/recommendations`, payload);
