export interface User {
  id?: string;
  login: string;
  password: string; // This will be the hashed password
  role: 'admin' | 'manager' | 'cashier';
  name: string;
  createdAt?: Date;
  active: boolean;
}
