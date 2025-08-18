export const getProductById = async (db, productId) => {
    const doc = await db.collection('products').doc(productId).get();
    if (!doc.exists) {
        return undefined;
    }
    return { id: doc.id, ...doc.data() };
};
export const getAllProducts = async (db) => {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const addProduct = async (db, newProduct) => {
    const docRef = db.collection('products').doc();
    const product = { id: docRef.id, ...newProduct };
    await docRef.set(product);
    return product;
};
export const updateProduct = async (db, productId, updatedProductData) => {
    const productRef = db.collection('products').doc(productId);
    const doc = await productRef.get();
    if (!doc.exists) {
        return undefined;
    }
    await productRef.update(updatedProductData);
    return { id: productId, ...doc.data(), ...updatedProductData };
};
export const deleteProduct = async (db, productId) => {
    const productRef = db.collection('products').doc(productId);
    const doc = await productRef.get();
    if (!doc.exists) {
        return false;
    }
    await productRef.delete();
    return true;
};
export const updateProductStock = async (db, productId, quantityChange) => {
    const productRef = db.collection('products').doc(productId);
    const doc = await productRef.get();
    if (!doc.exists) {
        return false;
    }
    const currentStock = doc.data()?.stock || 0;
    await productRef.update({ stock: currentStock + quantityChange });
    return true;
};
//# sourceMappingURL=products.js.map