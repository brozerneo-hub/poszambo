import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { db } from '../../config/firebase.config';
import { User } from '../../models/User';

const JWT_SECRET = 'votre_secret_jwt_a_changer'; // Change this to an environment variable

export const register = async (req: Request, res: Response) => {
    try {
        const { login, password, role, name } = req.body;

        const userRef = db.collection('users').where('login', '==', login);
        const snapshot = await userRef.get();
        if (!snapshot.empty) {
            return res.status(400).send({ message: 'User already exists.' });
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

        const docRef = await db.collection('users').add(newUser);
        return res.status(201).send({ id: docRef.id, ...newUser });

    } catch (error) {
        return res.status(500).send({ message: 'Error creating user', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        console.log('Login attempt for:', login); // Added log

        const userRef = db.collection('users').where('login', '==', login);
        const snapshot = await userRef.get();
        if (snapshot.empty) {
            console.log('User not found in DB:', login); // Added log
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const userDoc = snapshot.docs[0];
        const user = userDoc!.data() as User;
        console.log('User found:', user.login); // Added log

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid); // Added log
        if (!isPasswordValid) {
            console.log('Invalid password for user:', login); // Added log
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: userDoc!.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });

        return res.status(200).send({ token });

    } catch (error) {
        console.error('Error logging in:', error); // Modified log
        return res.status(500).send({ message: 'Error logging in', error });
    }
};
