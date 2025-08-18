export const processReturn = async (db, product, quantity) => {
    const returnRecord = {
        productId: product.id,
        productName: product.name,
        quantity,
        date: new Date(),
    };
    await db.collection('returns').add(returnRecord);
    return returnRecord;
};
//# sourceMappingURL=returns.js.map