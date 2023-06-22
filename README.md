APPLICATION DISKET

Cette application est un réseau social où les utilisateurs peuvent partager des publications, interagir avec d'autres utilisateurs en aimant leurs publications et suivre leurs activités. L'application est développée en utilisant React Native et Firebase.
Fonctionnalités

Création de compte : Les utilisateurs peuvent créer un compte en fournissant leur nom d'utilisateur, leur adresse e-mail, leur mot de passe et leur numéro de téléphone.

Connexion : Les utilisateurs enregistrés peuvent se connecter à leur compte en utilisant leur adresse e-mail et leur mot de passe.

Publication de contenu : Les utilisateurs peuvent créer des publications contenant du texte, des images ou les deux. Les publications sont affichées dans un flux pour que les autres utilisateurs puissent les voir.

Interaction avec les publications : Les utilisateurs peuvent aimer les publications des autres utilisateurs. Le nombre de likes est affiché sur chaque publication.

Configuration

Avant de pouvoir exécuter l'application, vous devez effectuer les étapes de configuration suivantes :

Installez Node.js et npm (Node Package Manager) sur votre machine.

Clonez ce référentiel GitHub sur votre machine.

Accédez au répertoire du projet dans votre terminal et exécutez la commande suivante pour installer les dépendances :

    npm install

Créez un projet Firebase sur la console Firebase (https://console.firebase.google.com) et récupérez les informations de configuration Firebase (clé d'API, ID du projet, etc.).

Créez un fichier de configuration Firebase nommé firebase.js dans le répertoire config du projet. Copiez les informations de configuration Firebase dans ce fichier.

Configurez les règles de sécurité Firestore pour autoriser les opérations d'écriture et de lecture nécessaires à l'application.

Exécutez l'application en utilisant la commande suivante :

    npm start

Cela lancera le serveur de développement et vous pourrez accéder à l'application via l'URL fournie.

Technologies utilisées

    React Native
    Firebase Authentication
    Firebase Firestore
    Firebase Storage
