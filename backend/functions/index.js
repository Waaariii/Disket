// Importation des modules Firebase Functions et Firebase Admin
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialisation de l'application Firebase
admin.initializeApp();

// Récupération de l'instance de la base de données Firestore
const db = admin.firestore();

// Fonction déclenchée lorsqu'un document est créé dans la collection "likes"
exports.addLike = functions.firestore.document('/posts/{creatorId}/userPosts/{postId}/likes/{userId}')
    .onCreate((snap, context) => {
        // Mise à jour du document correspondant dans la collection "userPosts"
        return db
            .collection("posts")
            .doc(context.params.creatorId)
            .collection("userPosts")
            .doc(context.params.postId)
            .update({
                likesCount: admin.firestore.FieldValue.increment(1)
            });
    });

// Fonction déclenchée lorsqu'un document est supprimé de la collection "likes"
exports.removeLike = functions.firestore.document('/posts/{creatorId}/userPosts/{postId}/likes/{userId}')
    .onDelete((snap, context) => {
        // Mise à jour du document correspondant dans la collection "userPosts"
        return db
            .collection('posts')
            .doc(context.params.creatorId)
            .collection('userPosts')
            .doc(context.params.postId)
            .update({
                likesCount: admin.firestore.FieldValue.increment(-1)
            });
    });
