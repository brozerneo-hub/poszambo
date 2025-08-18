export interface Product {
  id?: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  ref: string;
  description: string;
  category: string;
  traceability?: any; // To be defined later as per specs
}
