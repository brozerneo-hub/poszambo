/**
 * Calcule le montant de la TVA à partir du prix HT et du taux de TVA.
 * @param priceHT Prix hors taxe.
 * @param vatRate Taux de TVA (ex: 0.20 pour 20%).
 * @returns Le montant de la TVA.
 */
export declare const calculateVAT: (priceHT: number, vatRate: number) => number;
/**
 * Calcule le prix TTC à partir du prix HT et du montant de la TVA.
 * @param priceHT Prix hors taxe.
 * @param vatAmount Montant de la TVA.
 * @returns Le prix toutes taxes comprises.
 */
export declare const calculateTTC: (priceHT: number, vatAmount: number) => number;
/**
 * Calcule le prix HT et la TVA à partir d'un prix TTC.
 * @param priceTTC Prix toutes taxes comprises.
 * @param vatRate Taux de TVA (ex: 0.20 pour 20%).
 * @returns Un objet contenant le prix HT et le montant de la TVA.
 */
export declare const reverseVAT: (priceTTC: number, vatRate: number) => {
    priceHT: number;
    vatAmount: number;
};
//# sourceMappingURL=vat.d.ts.map