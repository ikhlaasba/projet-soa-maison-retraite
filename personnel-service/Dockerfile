# Dockerfile pour Service Personnel (Node.js)
FROM node:20-alpine

# Créer le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier tout le code source
COPY . .

# Exposer le port 8082
EXPOSE 8082

# Commande de démarrage
CMD ["node", "server.js"]