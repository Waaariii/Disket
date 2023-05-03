import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA_le95hEpCXDMlC0lmVCYEF1Nux6tC_YA",
  authDomain: "disket-73b36.firebaseapp.com",
  projectId: "disket-73b36",
  storageBucket: "disket-73b36.appspot.com",
  messagingSenderId: "593872861319",
  appId: "1:593872861319:web:66340e13ec05c6a0b6e022",
  measurementId: "G-F8KJ366C03"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;