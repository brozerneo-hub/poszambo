// Fonction pour convertir un article du panier en article de vente
export const createSaleItemFromCartItem = (cartItem) => {
    return {
        productId: cartItem.id,
        name: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        vatRate: cartItem.vatRate,
        totalHT: cartItem.totalHT,
        totalVAT: cartItem.totalVAT,
        totalTTC: cartItem.totalTTC,
    };
};
export const addSale = async (db, newSale) => {
    const docRef = db.collection('sales').doc();
    const sale = { id: docRef.id, ...newSale };
    await docRef.set(sale);
    return sale;
};
export const getAllSales = async (db) => {
    const snapshot = await db.collection('sales').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
//# sourceMappingURL=sales.js.map