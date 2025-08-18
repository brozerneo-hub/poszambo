import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/products.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
const router = Router();
router.route('/')
    .post(protect, authorize('admin', 'manager'), createProduct)
    .get(protect, getProducts);
router.route('/:id')
    .get(protect, getProduct)
    .put(protect, authorize('admin', 'manager'), updateProduct)
    .delete(protect, authorize('admin', 'manager'), deleteProduct);
export default router;
//# sourceMappingURL=products.routes.js.map