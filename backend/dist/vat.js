/**
 * Arrondit un nombre à deux décimales.
 * @param num Le nombre à arrondir.
 * @returns Le nombre arrondi.
 */
const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
/**
 * Calcule le montant de la TVA à partir du prix HT et du taux de TVA.
 * @param priceHT Prix hors taxe.
 * @param vatRate Taux de TVA (ex: 0.20 pour 20%).
 * @returns Le montant de la TVA.
 */
export const calculateVAT = (priceHT, vatRate) => {
    return round(priceHT * vatRate);
};
/**
 * Calcule le prix TTC à partir du prix HT et du montant de la TVA.
 * @param priceHT Prix hors taxe.
 * @param vatAmount Montant de la TVA.
 * @returns Le prix toutes taxes comprises.
 */
export const calculateTTC = (priceHT, vatAmount) => {
    return round(priceHT + vatAmount);
};
/**
 * Calcule le prix HT et la TVA à partir d'un prix TTC.
 * @param priceTTC Prix toutes taxes comprises.
 * @param vatRate Taux de TVA (ex: 0.20 pour 20%).
 * @returns Un objet contenant le prix HT et le montant de la TVA.
 */
export const reverseVAT = (priceTTC, vatRate) => {
    const priceHT = round(priceTTC / (1 + vatRate));
    const vatAmount = round(priceTTC - priceHT);
    return { priceHT, vatAmount };
};
//# sourceMappingURL=vat.js.map