import { db } from '../../config/firebase.config';
import Joi from 'joi';
const productSchema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    ref: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
});
export const createProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details?.[0]?.message || 'Validation error' });
        }
        const newProduct = req.body;
        const docRef = await db.collection('products').add(newProduct);
        return res.status(201).send({ id: docRef.id, ...newProduct });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error creating product', error });
    }
};
export const getProducts = async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return res.status(200).send(products);
    }
    catch (error) {
        return res.status(500).send({ message: 'Error getting products', error });
    }
};
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        const doc = await db.collection('products').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send({ id: doc.id, ...doc.data() });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error getting product', error });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details?.[0]?.message || 'Validation error' });
        }
        const updatedProduct = req.body;
        await db.collection('products').doc(id).update(updatedProduct);
        return res.status(200).send({ id, ...updatedProduct });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error updating product', error });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        await db.collection('products').doc(id).delete();
        return res.status(200).send({ message: 'Product deleted successfully' });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error deleting product', error });
    }
};
//# sourceMappingURL=products.controller.js.map