import { db } from '../config/firebase.config';
import * as bcrypt from 'bcrypt';
import { User } from '../models/User';

const createAdmin = async () => {
  try {
    const login = 'ADMIN';
    const password = '1234';
    const role = 'admin';
    const name = 'Administrator';

    const userRef = db.collection('users').where('login', '==', login);
    const snapshot = await userRef.get();

    if (!snapshot.empty) {
      console.log('Admin user already exists.');
      // Optionally, update the existing admin user's password
      const userDoc = snapshot.docs[0];
      const hashedPassword = await bcrypt.hash(password, 10);
      await userDoc.ref.update({ password: hashedPassword });
      console.log('Admin user password has been updated.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      login,
      password: hashedPassword,
      role,
      name,
      active: true,
      createdAt: new Date(),
    };

    await db.collection('users').add(newUser);
    console.log('Admin user created successfully.');

  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdmin();
