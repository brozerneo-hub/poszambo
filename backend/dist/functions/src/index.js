import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import authRoutes from './api/routes/auth.routes';
import productRoutes from './api/routes/products.routes';
import saleRoutes from './api/routes/sales.routes';
import statusRoutes from './api/routes/status.routes';
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
app.use('/status', statusRoutes);
export const api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map