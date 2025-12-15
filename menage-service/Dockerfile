# Dockerfile pour Service Ménage (.NET)

# Étape 1 : Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copier le fichier .csproj et restaurer les dépendances
COPY *.csproj ./
RUN dotnet restore

# Copier tout le code et compiler
COPY . ./
RUN dotnet publish -c Release -o out

# Étape 2 : Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Exposer le port 8085
EXPOSE 8085

# Variable d'environnement pour écouter sur toutes les interfaces
ENV ASPNETCORE_URLS=http://+:8085

# Commande de démarrage
ENTRYPOINT ["dotnet", "menage-service.dll"]