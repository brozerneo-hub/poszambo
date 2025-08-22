"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const firebase_config_1 = require("../../config/firebase.config");
const JWT_SECRET = 'votre_secret_jwt_a_changer'; // Change this to an environment variable
const register = async (req, res) => {
    try {
        const { login, password, role, name } = req.body;
        const userRef = firebase_config_1.db.collection('users').where('login', '==', login);
        const snapshot = await userRef.get();
        if (!snapshot.empty) {
            return res.status(400).send({ message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            login,
            password: hashedPassword,
            role,
            name,
            active: true,
            createdAt: new Date(),
        };
        const docRef = await firebase_config_1.db.collection('users').add(newUser);
        return res.status(201).send({ id: docRef.id, ...newUser });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error creating user', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        console.log('Login attempt for:', login); // Added log
        const userRef = firebase_config_1.db.collection('users').where('login', '==', login);
        const snapshot = await userRef.get();
        if (snapshot.empty) {
            console.log('User not found in DB:', login); // Added log
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        console.log('User found:', user.login); // Added log
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid); // Added log
        if (!isPasswordValid) {
            console.log('Invalid password for user:', login); // Added log
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: userDoc.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
        return res.status(200).send({ token });
    }
    catch (error) {
        console.error('Error logging in:', error); // Modified log
        return res.status(500).send({ message: 'Error logging in', error });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map