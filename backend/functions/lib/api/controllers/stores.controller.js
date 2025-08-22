"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStore = exports.updateStore = exports.createStore = exports.getStore = exports.getStores = void 0;
// import {
//     getAllStores,
//     getStoreById,
//     addStore,
//     updateStore as updateStoreInDb,
//     deleteStore as deleteStoreFromDb
// } from '../../../../dist/stores'; // Commented out
const getStores = async (req, res) => {
    try {
        // const stores = await getAllStores(db); // Commented out
        const stores = [
            { id: 'dummy-controller-1', name: 'Dummy Store Controller 1', address: '123 Controller St', salesCount: 0, stockQuantity: 0 },
            { id: 'dummy-controller-2', name: 'Dummy Store Controller 2', address: '456 Controller Ave', salesCount: 0, stockQuantity: 0 },
        ];
        return res.status(200).json(stores);
    }
    catch (error) {
        console.error("Error getting stores:", error);
        return res.status(500).json({ message: 'Error getting stores' });
    }
};
exports.getStores = getStores;
const getStore = async (req, res) => {
    return res.status(501).json({ message: 'Not Implemented' });
};
exports.getStore = getStore;
const createStore = async (req, res) => {
    return res.status(501).json({ message: 'Not Implemented' });
};
exports.createStore = createStore;
const updateStore = async (req, res) => {
    return res.status(501).json({ message: 'Not Implemented' });
};
exports.updateStore = updateStore;
const deleteStore = async (req, res) => {
    return res.status(501).json({ message: 'Not Implemented' });
};
exports.deleteStore = deleteStore;
//# sourceMappingURL=stores.controller.js.map