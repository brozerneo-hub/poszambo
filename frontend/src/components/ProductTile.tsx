import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
}

interface ProductTileProps {
  product: Product;
  onClick: () => void;
}

const ProductTile: React.FC<ProductTileProps> = ({ product, onClick }) => {
  return (
    <div
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-700"
      onClick={onClick}
    >
      <img src={product.images[0] || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-400">{product.price}€</p>
      <p className="text-sm">Stock: {product.stock}</p>
    </div>
  );
};

export default ProductTile;