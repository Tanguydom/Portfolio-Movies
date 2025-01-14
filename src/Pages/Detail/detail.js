import { getDetail, getCredits, getTrailers, getRecommendation } from '../../service/service.js';

// Fonction pour extraire les paramètres de l'URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Charger les détails du film ou de la série
async function loadMovieDetails() {
  const type = getQueryParam('type'); // Ex : 'movie' ou 'tv'
  const id = getQueryParam('id'); // ID du film ou de la série

  if (!type || !id) {
    document.getElementById('movie-detail').innerHTML = '<p>Movie or TV Show not found.</p>';
    return;
  }

  try {
    // Charger les données principales
    const [movie, credits, trailers, recommendations] = await Promise.all([
      fetchDetail(type, id),
      fetchCredits(type, id),
      fetchTrailers(type, id),
      fetchRecommendations(type, id),
    ]);

    displayMovieDetails(movie);
    displayCredits(credits);
    displayTrailers(trailers);
    displayRecommendations(recommendations);
  } catch (error) {
    console.error('Error loading movie details:', error);
    document.getElementById('movie-detail').innerHTML =
      '<p>Error loading movie or TV Show details. Please try again later.</p>';
  }
}

// Méthodes de récupération des données
async function fetchDetail(type, id) {
  try {
    return await getDetail(type, id, { language: 'en-US' });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

async function fetchCredits(type, id) {
  try {
    const credits = await getCredits(type, id, { language: 'en-US' });
    return credits?.cast || [];
  } catch (error) {
    console.error('Error fetching credits:', error);
    return [];
  }
}

async function fetchTrailers(type, id) {
  try {
    const trailers = await getTrailers(type, id, { language: 'en-US' });
    return trailers?.results || [];
  } catch (error) {
    console.error('Error fetching trailers:', error);
    return [];
  }
}

async function fetchRecommendations(type, id) {
  try {
    const recommendations = await getRecommendation(type, id, { language: 'en-US' });
    return recommendations?.results || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}

// Afficher les détails principaux
function displayMovieDetails(movie) {
  const bannerImage = document.getElementById('banner-image');
  const posterImage = document.getElementById('poster-image');
  const movieTitle = document.getElementById('movie-title');
  const movieYearLanguage = document.getElementById('movie-year-language');
  const movieGenres = document.getElementById('movie-genres');
  const movieOverview = document.getElementById('movie-overview');

  if (!movie) {
    document.getElementById('movie-detail').innerHTML = '<p>Details not available.</p>';
    return;
  }

  // Set banner image
  bannerImage.src = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : './src/assets/images/placeholder.png';

  // Set poster image
  posterImage.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : './src/assets/images/placeholder.png';

  // Set movie title
  movieTitle.innerText = movie.title || movie.name;

  // Set release year and language
  movieYearLanguage.innerText = `${movie.release_date?.split('-')[0] || 'N/A'} • ${
    movie.spoken_languages?.[0]?.english_name || 'N/A'
  }`;

  // Set genres
  movieGenres.innerHTML = movie.genres
    .map((genre) => `<span>${genre.name}</span>`)
    .join('');

  // Set overview
  movieOverview.innerText = movie.overview || 'No description available.';
}

// Afficher les casts
function displayCredits(cast) {
  const container = document.getElementById('movie-credits');
  if (cast.length === 0) {
    container.innerHTML = '<p>No credits available.</p>';
    return;
  }

  container.innerHTML = `
    <h2>Full Cast</h2>
    <div class="credits-carousel">
      ${cast
        .map((actor) => {
          if (!actor.profile_path) return ''; // Ignorer les casts sans image
          return `
            <div class="credit-card">
              <img
                src="https://image.tmdb.org/t/p/w200${actor.profile_path}"
                alt="${actor.name}"
              />
              <p class="character">${actor.character || 'N/A'}</p>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

// Afficher les trailers
function displayTrailers(trailers) {
  const container = document.getElementById('movie-trailers');
  if (trailers.length === 0) {
    container.innerHTML = '<p>No trailers available.</p>';
    return;
  }
  container.innerHTML = `
    <h2>Trailers</h2>
    <div class="trailers-carousel">
      ${trailers
        .filter((trailer) => trailer.site === 'YouTube')
        .map(
          (trailer) => `
          <div class="trailer-card">
            <iframe 
              src="https://www.youtube.com/embed/${trailer.key}" 
              frameborder="0" 
              allowfullscreen 
              title="${trailer.name}">
            </iframe>
          </div>
        `
        )
        .join('')}
    </div>
  `;
}


// Afficher les recommandations
function displayRecommendations(recommendations) {
  const container = document.getElementById('movie-recommendations');
  if (recommendations.length === 0) {
    container.innerHTML = '<p>No recommendations available.</p>';
    return;
  }
  container.innerHTML = `
    <h2>Recommendations</h2>
    <div class="recommendations-carousel">
      ${recommendations
        .map(
          (movie) => `
          <div class="recommendation-card">
            <img src="${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : './src/assets/images/placeholder.png'
            }" alt="${movie.title || movie.name}" />
            <p>${movie.title || movie.name}</p>
          </div>
        `
        )
        .join('')}
    </div>
  `;
}


// Gérer les carrousels
function attachCarouselScroll(carouselId, prevButtonId, nextButtonId) {
  const carousel = document.getElementById(carouselId);
  const prevButton = document.getElementById(prevButtonId);
  const nextButton = document.getElementById(nextButtonId);

  prevButton.addEventListener('click', () => {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
  });

  nextButton.addEventListener('click', () => {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  });
}

// Charger les détails au démarrage
loadMovieDetails();
