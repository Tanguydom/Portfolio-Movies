
const api = {
  baseURL: 'http://tanguy-domergue.fr/movies-api/movies', // URL de base pour l'API

  // Méthode GET
  get: async (endpoint, params = {}) => {
    const url = new URL(`${api.baseURL}${endpoint}`);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',  // Activez le mode CORS
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },
};

export default api;
