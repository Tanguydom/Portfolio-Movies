import { getPopular} from '../../service/service.js';

async function displayTrendingMovies() {
  const carouselTrack = document.getElementById('popular-movies');

  try {
    const data = await getPopular(); // Récupérer les films depuis l'API
    const movies = data.results || [];
    carouselTrack.innerHTML = ''; // Réinitialiser le contenu du carrousel

    if (movies.length === 0) {
      carouselTrack.innerHTML = '<p>No trending movies found.</p>';
      return;
    }

    // Ajouter les films au carrousel
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      carouselTrack.appendChild(movieCard);
    });

    // Activer le défilement par glissement
    enableCarouselDrag(carouselTrack);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    carouselTrack.innerHTML = '<p>Error loading trending movies. Please try again later.</p>';
  }
}

// Fonction pour créer une carte de film
function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.className = 'movie-card';

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`
    : './src/assets/images/placeholder.png';

  movieCard.innerHTML = `
    <div class="movie-poster">
      <img src="${poster}" alt="${movie.title || movie.name}" />
    </div>
    <div class="movie-info">
      <h4>${movie.title || movie.name}</h4>
      <p>${movie.release_date?.split('-')[0] || 'N/A'}</p>
      <div class="rating">
        <span class="star">⭐</span>
        <span>${movie.vote_average || 'N/A'}</span>
      </div>
    </div>
  `;

    // Rediriger vers la page de détails au clic
    movieCard.addEventListener('click', () => {
      window.location.href = `src/Pages/Detail/movie-detail.html?type=movie&id=${movie.id}`;
    });
    
  return movieCard;
}

// Fonction pour activer le défilement par glissement
function enableCarouselDrag(carousel) {
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Début du glissement
  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  // Fin du glissement
  carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.classList.remove('dragging');
  });

  // Quitter le glissement si la souris sort
  carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.classList.remove('dragging');
  });

  // Déplacement de la souris
  carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Vitesse du défilement
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Défilement sur appareils tactiles
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX);
    carousel.scrollLeft = scrollLeft - walk;
  });
}

// Charger les films au démarrage
document.addEventListener('DOMContentLoaded', () => {
  displayTrendingMovies();
});
