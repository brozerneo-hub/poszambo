import { Router } from 'express';
import {
    getStores,
    getStore,
    createStore,
    updateStore,
    deleteStore
} from '../controllers/stores.controller';

const router = Router();

router.route('/')
    .get(getStores)
    .post(createStore);

router.route('/:id')
    .get(getStore)
    .put(updateStore)
    .delete(deleteStore);

export default router;