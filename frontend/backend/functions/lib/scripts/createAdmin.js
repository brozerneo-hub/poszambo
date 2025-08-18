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
const firebase_config_1 = require("../config/firebase.config");
const bcrypt = __importStar(require("bcrypt"));
const createAdmin = async () => {
    try {
        const login = 'ADMIN';
        const password = '1234';
        const role = 'admin';
        const name = 'Administrator';
        const userRef = firebase_config_1.db.collection('users').where('login', '==', login);
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
        const newUser = {
            login,
            password: hashedPassword,
            role,
            name,
            active: true,
            createdAt: new Date(),
        };
        await firebase_config_1.db.collection('users').add(newUser);
        console.log('Admin user created successfully.');
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
};
createAdmin();
//# sourceMappingURL=createAdmin.js.map