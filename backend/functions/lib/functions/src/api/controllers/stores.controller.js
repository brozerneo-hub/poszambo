"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStore = exports.updateStore = exports.createStore = exports.getStore = exports.getStores = void 0;
const firebase_config_1 = require("../../config/firebase.config");
const stores_1 = require("../../../../src/stores");
const getStores = async (req, res) => {
    try {
        const stores = await (0, stores_1.getAllStores)(firebase_config_1.db);
        return res.status(200).json(stores);
    }
    catch (error) {
        console.error("Error getting stores:", error);
        return res.status(500).json({ message: 'Error getting stores' });
    }
};
exports.getStores = getStores;
const getStore = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Store ID is required' });
        }
        const store = await (0, stores_1.getStoreById)(firebase_config_1.db, id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.status(200).json(store);
    }
    catch (error) {
        console.error("Error getting store:", error);
        return res.status(500).json({ message: 'Error getting store' });
    }
};
exports.getStore = getStore;
const createStore = async (req, res) => {
    try {
        const newStore = await (0, stores_1.addStore)(firebase_config_1.db, req.body);
        return res.status(201).json(newStore);
    }
    catch (error) {
        console.error("Error creating store:", error);
        return res.status(500).json({ message: 'Error creating store' });
    }
};
exports.createStore = createStore;
const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStore = await (0, stores_1.updateStore)(firebase_config_1.db, id, req.body);
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.status(200).json(updatedStore);
    }
    catch (error) {
        console.error("Error updating store:", error);
        return res.status(500).json({ message: 'Error updating store' });
    }
};
exports.updateStore = updateStore;
const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await (0, stores_1.deleteStore)(firebase_config_1.db, id);
        if (!success) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting store:", error);
        return res.status(500).json({ message: 'Error deleting store' });
    }
};
exports.deleteStore = deleteStore;
//# sourceMappingURL=stores.controller.js.map