# Utilisation de l'image Nginx légère
FROM nginx:alpine

# Copier les fichiers du site dans le dossier HTML par défaut de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 8081 pour le frontend Movie
EXPOSE 8081
