"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.route('/')
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)('admin', 'manager'), products_controller_1.createProduct)
    .get(products_controller_1.getProducts);
router.route('/:id')
    .get(auth_middleware_1.protect, products_controller_1.getProduct)
    .put(auth_middleware_1.protect, (0, auth_middleware_1.authorize)('admin', 'manager'), products_controller_1.updateProduct)
    .delete(auth_middleware_1.protect, (0, auth_middleware_1.authorize)('admin', 'manager'), products_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map