import { Request, Response } from 'express';
import { db } from '../../config/firebase.config';
import { 
    getAllStores, 
    getStoreById,
    addStore,
    updateStore as updateStoreInDb,
    deleteStore as deleteStoreFromDb
} from '../../../../dist/stores';

export const getStores = async (req: Request, res: Response) => {
    try {
        const stores = await getAllStores(db);
        return res.status(200).json(stores);
    } catch (error) {
        console.error("Error getting stores:", error);
        return res.status(500).json({ message: 'Error getting stores' });
    }
};

export const getStore = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Store ID is required' });
        }
        const store = await getStoreById(db, id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.status(200).json(store);
    } catch (error) {
        console.error("Error getting store:", error);
        return res.status(500).json({ message: 'Error getting store' });
    }
};

export const createStore = async (req: Request, res: Response) => {
    try {
        const newStore = await addStore(db, req.body);
        return res.status(201).json(newStore);
    } catch (error) {
        console.error("Error creating store:", error);
        return res.status(500).json({ message: 'Error creating store' });
    }
};

export const updateStore = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedStore = await updateStoreInDb(db, id, req.body);
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.status(200).json(updatedStore);
    } catch (error) {
        console.error("Error updating store:", error);
        return res.status(500).json({ message: 'Error updating store' });
    }
};

export const deleteStore = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await deleteStoreFromDb(db, id);
        if (!success) {
            return res.status(404).json({ message: 'Store not found' });
        }
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting store:", error);
        return res.status(500).json({ message: 'Error deleting store' });
    }
};