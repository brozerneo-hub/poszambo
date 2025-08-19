export const getStoreById = async (db, storeId) => {
    const doc = await db.collection('stores').doc(storeId).get();
    if (!doc.exists) {
        return undefined;
    }
    return { id: doc.id, ...doc.data() };
};
export const getAllStores = async (db) => {
    const snapshot = await db.collection('stores').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const addStore = async (db, newStore) => {
    const docRef = db.collection('stores').doc();
    const store = { id: docRef.id, ...newStore };
    await docRef.set(store);
    return store;
};
export const updateStore = async (db, storeId, updatedStoreData) => {
    const storeRef = db.collection('stores').doc(storeId);
    const doc = await storeRef.get();
    if (!doc.exists) {
        return undefined;
    }
    await storeRef.update(updatedStoreData);
    return { id: storeId, ...doc.data(), ...updatedStoreData };
};
export const deleteStore = async (db, storeId) => {
    const storeRef = db.collection('stores').doc(storeId);
    const doc = await storeRef.get();
    if (!doc.exists) {
        return false;
    }
    await storeRef.delete();
    return true;
};
//# sourceMappingURL=stores.js.map