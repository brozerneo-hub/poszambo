export const getClientById = async (db, clientId) => {
    const doc = await db.collection('clients').doc(clientId).get();
    if (!doc.exists) {
        return undefined;
    }
    return { id: doc.id, ...doc.data() };
};
export const getAllClients = async (db) => {
    const snapshot = await db.collection('clients').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const addClient = async (db, newClient) => {
    const docRef = db.collection('clients').doc();
    const client = { id: docRef.id, ...newClient };
    await docRef.set(client);
    return client;
};
export const updateClient = async (db, clientId, updatedClientData) => {
    const clientRef = db.collection('clients').doc(clientId);
    const doc = await clientRef.get();
    if (!doc.exists) {
        return undefined;
    }
    await clientRef.update(updatedClientData);
    return { id: clientId, ...doc.data(), ...updatedClientData };
};
export const deleteClient = async (db, clientId) => {
    const clientRef = db.collection('clients').doc(clientId);
    const doc = await clientRef.get();
    if (!doc.exists) {
        return false;
    }
    await clientRef.delete();
    return true;
};
//# sourceMappingURL=clients.js.map