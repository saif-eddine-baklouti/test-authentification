# Installation

1. Créer un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

```bash
PORT=3301
SALT="patate!"
```

2. Ajouter les accès à la base de données dans un fichier db-config.json à la racine du projet. On trouve ce fichier dans Firestore.

3. Installer les dépendances :

```bash
npm install
```

3. Lancer script de développement. Vérifiez que le script est bien configuré dans le fichier `package.json` :

```bash
npm run dev
```
