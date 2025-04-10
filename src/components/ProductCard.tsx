
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../services/api';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="p-4 flex-grow">
          <div className="aspect-product-image mb-4 flex items-center justify-center p-2">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="h-14 overflow-hidden">
            <h3 className="font-medium text-sm line-clamp-2" title={product.title}>
              {product.title}
            </h3>
          </div>
          <div className="mt-2">
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          </div>
        </div>
        
        <CardFooter className="border-t p-3 bg-gray-50">
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleAddToCart}
            className="w-full gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
