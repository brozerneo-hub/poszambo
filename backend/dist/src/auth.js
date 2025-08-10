export const getUserByUsername = async (db, username) => {
    const snapshot = await db.collection('users').where('username', '==', username).limit(1).get();
    if (snapshot.empty) {
        return undefined;
    }
    const doc = snapshot.docs[0];
    if (!doc)
        return undefined;
    const data = doc.data();
    return { id: doc.id, ...data };
};
export const addUser = async (db, username, passwordHash, role) => {
    const newUserRef = db.collection('users').doc();
    const newUser = { id: newUserRef.id, username, passwordHash, role };
    await newUserRef.set(newUser);
    return newUser;
};
export const updateUserRole = async (db, userId, newRole) => {
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
        return false;
    }
    await userRef.update({ role: newRole });
    return true;
};
export const updateUserPassword = async (db, userId, newPasswordHash) => {
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
        return false;
    }
    await userRef.update({ passwordHash: newPasswordHash });
    return true;
};
export const deleteUser = async (db, userId) => {
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
        return false;
    }
    await userRef.delete();
    return true;
};
export const getAllUsers = async (db) => {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
//# sourceMappingURL=auth.js.map