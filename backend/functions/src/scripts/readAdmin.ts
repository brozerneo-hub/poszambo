import { db } from '../config/firebase.config';

const readAdmin = async () => {
  try {
    const login = 'ADMIN';
    const userRef = db.collection('users').where('login', '==', login);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      console.log('User "ADMIN" not found.');
      return;
    }

    snapshot.forEach(doc => {
      console.log('Found user:', doc.id, '=>', doc.data());
    });

  } catch (error) {
    console.error('Error reading admin user:', error);
  }
};

readAdmin();
