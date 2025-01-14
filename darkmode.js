// Gestion du mode sombre
function toggleDarkMode() {
  const body = document.body;
  const darkModeIcon = document.getElementById('darkModeIcon');
  const isDarkMode = body.classList.toggle('dark-mode'); // Ajoute/enlève la classe "dark-mode"

  darkModeIcon.src = isDarkMode
    ? '/src/assets/images/moon.png' // Icône lune pour le mode sombre
    : '/src/assets/images/sunny.png'; // Icône soleil pour le mode clair

  // Sauvegarde la préférence utilisateur dans localStorage
  localStorage.setItem('darkMode', isDarkMode);
}

// Applique le mode sombre au chargement de la page si activé
document.addEventListener('DOMContentLoaded', () => {
  // Récupère la préférence utilisateur depuis localStorage
  const darkModePreference = localStorage.getItem('darkMode') === 'true';
  if (darkModePreference) {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeIcon').src = '/src/assets/images/moon.png';
  } else {
    document.getElementById('darkModeIcon').src = '/src/assets/images/sunny.png';
  }

  // Ajoute l'événement au bouton de basculement
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
});
