
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import bcrypt from 'bcrypt';
import cors from 'cors';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // TODO: Replace with a strong, environment-variable-based secret in production

import { getUserByUsername, addUser, updateUserRole, updateUserPassword, deleteUser, getAllUsers } from './auth.js';
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, updateProductStock } from './products.js';
import { getAllClients, getClientById, addClient, updateClient, deleteClient } from './clients.js';
import { createCart, addToCart, removeFromCart, updateItemQuantity } from './cart.js';
import { addSale, getAllSales, createSaleItemFromCartItem } from './sales.js';
import { processReturn } from './returns.js';
import { User, Cart, PaymentMethod, Sale, Client, Product } from './types.js';

initializeApp();
export const db = getFirestore();



const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// Logging middleware
app.use((req: Request, res: Response, next: Function) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
});

let sessionCart: Cart = createCart();

// Middleware pour autoriser les rôles
const authorize = (allowedRoles: string[]) => (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Authorization header missing.');
  }

  const token = authHeader.split(' ')[1]; // Expects "Bearer TOKEN"
  if (!token) {
    return res.status(401).send('Token missing.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, username: string, role: string };
    (req as any).user = decoded; // Attach user info to request
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).send('Access denied.');
    }
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).send('Invalid or expired token.');
  }
};

// --- Routes publiques ---
app.get('/', (req: Request, res: Response) => res.send('Hello from the backend!'));

// Temporary route to set up a default admin user for testing
app.get('/setup-admin', async (req: Request, res: Response) => {
  try {
    const username = 'ADMIN';
    const password = '1234';
    const role = 'admin';

    const existingUser = await getUserByUsername(db, username);
    if (existingUser) {
      return res.status(200).send('Admin user already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await addUser(db, username, passwordHash, role);
    res.status(201).send('Default admin user created successfully.');
  } catch (error) {
    console.error('Error setting up admin user:', error);
    res.status(500).send('Error setting up admin user.');
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(db, username); // Pass db
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Routes pour les produits ---
app.get('/products', async (req: Request, res: Response) => {
  try {
    const productsList = await getAllProducts(db);
    res.json(productsList);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await getProductById(db, req.params.id as string);
    if (product) res.json(product);
    else res.status(404).send('Product not found');
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post(
  '/products',
  authorize(['manager', 'admin']),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Product price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Product stock must be a non-negative integer').optional(),
    body('category').notEmpty().withMessage('Product category is required').optional(),
    body('brand').notEmpty().withMessage('Product brand is required').optional(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProductData = req.body;
    try {
      const product = await addProduct(db, newProductData);
      res.status(201).json(product);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).send('Internal Server Error');
    }
  }
);

app.put('/products/:productId', authorize(['manager', 'admin']), async (req: Request, res: Response) => {
  const productId = req.params.productId as string;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await updateProduct(db, productId, updatedProductData);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/products/:productId', authorize(['manager', 'admin']), async (req: Request, res: Response) => {
  const productId = req.params.productId as string;
  try {
    const success = await deleteProduct(db, productId);
    if (success) {
      res.status(200).send('Product deleted');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Routes pour les clients ---
app.get('/clients', authorize(['sales', 'manager', 'admin']), async (req: Request, res: Response) => {
  try {
    const clientsList = await getAllClients(db);
    res.json(clientsList.map(c => ({ id: c.id, firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone, loyaltyCardNumber: c.loyaltyCardNumber })));
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/clients/:clientId', authorize(['sales', 'manager', 'admin']), async (req: Request, res: Response) => {
  try {
    const client = await getClientById(db, req.params.clientId as string);
    if (client) res.json(client);
    else res.status(404).send('Client not found');
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/clients', authorize(['manager', 'admin']), async (req: Request, res: Response) => {
  const newClientData = req.body;
  if (!newClientData || !newClientData.firstName || !newClientData.lastName) {
    return res.status(400).send('First name and last name are required');
  }
  try {
    const client = await addClient(db, newClientData);
    res.status(201).json(client);
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/clients/:clientId', authorize(['manager', 'admin']), async (req: Request, res: Response) => {
  const clientId = req.params.clientId as string;
  const updatedClientData = req.body;
  try {
    const updatedClient = await updateClient(db, clientId, updatedClientData);
    if (updatedClient) {
      res.status(200).json(updatedClient);
    } else {
      res.status(404).send('Client not found');
    }
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/clients/:clientId', authorize(['manager', 'admin']), async (req: Request, res: Response) => {
  const clientId = req.params.clientId as string;
  try {
    const success = await deleteClient(db, clientId);
    if (success) {
      res.status(200).send('Client deleted');
    } else {
      res.status(404).send('Client not found');
    }
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Routes pour le panier (reste en mémoire pour la session) ---
app.get('/cart', (req: Request, res: Response) => res.json(sessionCart));

app.post('/cart/add', async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  try {
    const product = await getProductById(db, productId as string); // Pass db
    if (!product) return res.status(404).send('Product not found');
    sessionCart = addToCart(sessionCart, product, quantity);
    res.status(200).json(sessionCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/cart/item/:productId', (req: Request, res: Response) => {
  sessionCart = removeFromCart(sessionCart, req.params.productId as string);
  res.status(200).json(sessionCart);
});

app.put('/cart/item/:productId', (req: Request, res: Response) => {
  const { quantity } = req.body;
  sessionCart = updateItemQuantity(sessionCart, req.params.productId as string, quantity);
  res.status(200).json(sessionCart);
});

// --- Routes pour les ventes ---
app.get('/sales', authorize(['manager', 'admin']), async (req: Request, res: Response) => {
  try {
    const salesList = await getAllSales(db);
    res.json(salesList);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/sales', authorize(['sales', 'manager', 'admin']), async (req: Request, res: Response) => {
  const { paymentMethod, clientId } = req.body as { paymentMethod: PaymentMethod; clientId?: string };

  if (!paymentMethod) {
    return res.status(400).send('Payment method is required');
  }
  if (sessionCart.items.length === 0) {
    return res.status(400).send('Cannot process an empty cart');
  }

  try {
    for (const item of sessionCart.items) {
      await updateProductStock(db, item.id, -item.quantity); // Décrémente le stock
    }

    const newSale: Omit<Sale, 'id'> = {
      date: new Date(),
      items: sessionCart.items.map(createSaleItemFromCartItem),
      totalHT: sessionCart.totalHT,
      totalVAT: sessionCart.totalVAT,
      totalTTC: sessionCart.totalTTC,
      paymentMethod,
      clientId,
    };

    const addedSale = await addSale(db, newSale);
    sessionCart = createCart(); // Vide le panier après la vente
    res.status(201).json(addedSale);
  } catch (error) {
    console.error('Error processing sale:', error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Route pour les retours client ---
app.post('/returns', authorize(['sales', 'manager', 'admin']), async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).send('Product ID and a valid quantity are required');
  }

  try {
    const product = await getProductById(db, productId as string); // Pass db
    if (!product) {
      return res.status(404).send('Product not found');
    }

    await updateProductStock(db, productId as string, quantity); // Incrémente le stock // Pass db
    const returnRecord = await processReturn(db, product, quantity);
    res.status(201).json(returnRecord);
  } catch (error) {
    console.error('Error processing return:', error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Routes pour la gestion des utilisateurs ---
app.get('/users', authorize(['admin']), async (req: Request, res: Response) => {
  try {
    const allUsers = await getAllUsers(db); // Pass db
    res.json(allUsers.map(u => ({ id: u.id, username: u.username, role: u.role })));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users', authorize(['admin']), async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).send('Username, password, and role are required');
  }
  try {
    const existingUser = await getUserByUsername(db, username); // Pass db
    if (existingUser) {
      return res.status(409).send('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await addUser(db, username, passwordHash, role); // Pass db
    res.status(201).json({ message: 'User created', user: { id: newUser.id, username: newUser.username, role: newUser.role } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/users/:userId/role', authorize(['admin']), async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  const { role } = req.body;
  try {
    const success = await updateUserRole(db, userId, role); // Pass db
    if (success) {
      const updatedUser = await getUserByUsername(db, userId); // Pass db
      res.status(200).json({ message: 'User role updated', user: { id: updatedUser?.id, username: updatedUser?.username, role: updatedUser?.role } });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/users/:userId/password', authorize(['admin']), async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  const { newPassword } = req.body;
  try {
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const success = await updateUserPassword(db, userId, newPasswordHash); // Pass db
    if (success) {
      res.status(200).send('Password updated');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating user password:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/users/:userId', authorize(['admin']), async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  try {
    const success = await deleteUser(db, userId); // Pass db
    if (success) {
      res.status(200).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

export const api = functions.https.onRequest(app);

