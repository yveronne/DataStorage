# Module DataStorage du projet de synthèse : Weather Station
## Intro
implémentation de la REST API d'accès au données météorologiques : Sequelize + NodeJs + Express

## Pour commencer
Les instructions ci dessous vous permettront de copier et déployer le projet en local pour développement ou test.

### prérequis
Après avoir installé postgresql (postgresql <= 10) sur votre machine, excéutez les étapes suivantes : 
- cloner le projet et décompressez le 
- dans le répertoire racine faites un coup de 
```
$ cd DataStorage
$ npm install
```
- Dans le fichier config.json, remplacer 
 * les champs 'username' et 'password' par vos identifiants posgres, 
 * le champ 'database' par le nom de la base de données que vou souhaitez créer (sequelize s'engage à le faire),
 * le champ 'host' par l'adresse IP de votre machine (127.0.0.1 en local)
Sequelize est un excellent ORM qui permet de créer notre base de données et reproduire notre modèle dans celle-ci.
- pour créer la base de données, faites un coup de 
```
$ sequelize db:create
```
- pour mapper le modèle :
```
$ sequelize db:migrate
```
- puis initialisez avec des données d'essai en faisant 
```
$ sequelize db:seed:all
```

### installation
Étant toujours dans le répertoire racine, faites un coup de 
```
$ npm run start 
```
pour lancer le serveur. 
Accédez-y en cliquant sur le lien http://localhost:3000. 

### Test 
Listes des différentes routes supportées par notre API
1. Stations météo 

Méthode HTTP | URL | Action 
-------------|-----|----------
POST | /api/stations | Ajoute une station
GET  | /api/stations | Liste toutes les stations météo
GET  | /api/stations/:stationId | Affiche les informations de la piscine dont l'id est stationId
PUT  | /api/stations/:stationId | Modifie les données de la station dont l'id est stationId
DELETE | /api/stations/:stationId | Supprime la station dont l'id est stationId
