"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const firebase_config_1 = require("../../config/firebase.config");
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    brand: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    stock: joi_1.default.number().required(),
    ref: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
});
const createProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details?.[0]?.message || 'Validation error' });
        }
        const newProduct = req.body;
        const docRef = await firebase_config_1.db.collection('products').add(newProduct);
        return res.status(201).send({ id: docRef.id, ...newProduct });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error creating product', error });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const snapshot = await firebase_config_1.db.collection('products').get();
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
exports.getProducts = getProducts;
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        const doc = await firebase_config_1.db.collection('products').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send({ id: doc.id, ...doc.data() });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error getting product', error });
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
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
        await firebase_config_1.db.collection('products').doc(id).update(updatedProduct);
        return res.status(200).send({ id, ...updatedProduct });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error updating product', error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        await firebase_config_1.db.collection('products').doc(id).delete();
        return res.status(200).send({ message: 'Product deleted successfully' });
    }
    catch (error) {
        return res.status(500).send({ message: 'Error deleting product', error });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.controller.js.map