import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "VOTRE_CLE_API",
  authDomain: "VOTRE_DOMAINE_AUTH",
  projectId: "VOTRE_ID_PROJET",
  storageBucket: "VOTRE_BUCKET",
  messagingSenderId: "VOTRE_ID_SENDER",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_ID_MEASUREMENT"
};

// Initialisation de Firebase avec la configuration
firebase.initializeApp(firebaseConfig);

export default firebase;
