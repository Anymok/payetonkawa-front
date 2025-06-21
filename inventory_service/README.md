# Installation et configuration

## Initialisation du projet
`npm init`

##### Installation de yarn
`npm install --global yarn`

## Installation des packages nécéssaires

##### Utilitaire qui permet de redémarrer automatiquement le serveur lorsqu'un fichier est modifié
`yarn add nodemon`

##### Installation framework nodejs avec express
`yarn add express`

##### Installation de cors qui permet de ne plus rendre bloquant l'accès aux ressources via les requêtes
`yarn add cors`

## Lancement de l'api
`yarn start`

## Lancer le Cloud CLI (tunnel vers la base de données)
`cloud-sql-proxy --port 5432 forward-garden-421314:europe-west1:ravea-db`

