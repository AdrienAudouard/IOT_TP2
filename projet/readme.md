# Projet Arduino

## Lancer le serveur 

### Dans un premier terminal 

Lancer la commande

```
mongod
```

Ne pas fermer ce terminal !

### Dans un second terminal

```
npm install
npm run dev
```

Le serveur est disponible à l'adresse: http://localhost:5000

## Api du serveur 

* **get: api/lumiere** -> Obtenir toute les valeurs de lumiere
* **get: api/lumiere/latest** -> Obtenir la derniere valeur insérée dans la BD
* **post: api/lumiere** -> Ajoute une valeur de lumière dans la BD, le body de la requete doit contenir la paramètre 'lumiere'

Si la requête est bien executée un code HTTP 200 avec la réponse est renvoyé sinon une erreur HTTP avec le code erreur correspondant est renvoyée.
