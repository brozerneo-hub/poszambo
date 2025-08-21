import * as functions from 'firebase-functions';
import express, { Router } from 'express';
import cors from 'cors';

import authRoutes from './api/routes/auth.routes';
import productRoutes from './api/routes/products.routes';
import saleRoutes from './api/routes/sales.routes';
import statusRoutes from './api/routes/status.routes';
import storesRoutes from './api/routes/stores.routes';

const main = express();
const apiRouter = Router();

main.use(cors({ origin: true }));
main.use(express.json());

// Mount the specific routes on the apiRouter
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/sales', saleRoutes);
apiRouter.use('/status', statusRoutes);
apiRouter.use('/stores', storesRoutes);

apiRouter.get('/test', (req, res) => res.send('API Test OK'));

// Mount the apiRouter under the /api path
main.use('/api', apiRouter);

export const api = functions.https.onRequest(main);
