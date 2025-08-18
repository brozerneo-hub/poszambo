// frontend/src/config/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// IMPORTANT: Remplacez les valeurs ci-dessous par celles de votre projet Firebase
const firebaseConfig = {
apiKey: "AIzaSyBU1Q4Q9Kg31V9XLfWpEBMYgkVLh2GB0W0",
authDomain: "dreampos-94155.firebaseapp.com",
projectId: "dreampos-94155",
storageBucket: "dreampos-94155.firebasestorage.app",
messagingSenderId: "9643074965",
appId: "1:9643074965:web:55089187018ab68b8c029c",
measurementId: "G-M8K8GYF2YZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Se connecte à l'émulateur Firestore en développement
if (process.env.NODE_ENV === 'development') {
  // Assurez-vous que le port correspond à celui configuré dans votre firebase.json
  connectFirestoreEmulator(db, 'localhost', 8180);
}

export { db };