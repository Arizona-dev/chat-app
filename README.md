# Projet - League pépite #1

## La Stack

##### Front:
  - React.js
  - Tailwind.css

##### Back:
  - Node.js
  - Mongoose

## Installation

##### Pour lancer le projet:
  1 - Installer les dépendances dans les deux dossier /webchat et /webchat-api
```sh
npm install /webchat && npm install /webchat-api
```
2 - Créer le fichier .env à l'aide du .env.example dans /webchat-api, et remplir les informations de connexion à votre base de données, mongoDB (atlas)
3 - Lancer les applications
```sh
npm run start /webchat && npm run start /webchat-api
```

#### Débug
Si vous rencontrez un problème lors de la connection avec mongoose et que votre mot de passe contient des caractères spéciaux lors de la création de votre cluster, vous devrez encoder en format HEX et ensuite le mettre dans DBPASSWORD.