import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { MinusIcon, PlusIcon, ArrowLeft, ShoppingCart, Loader2, Star } from 'lucide-react';
import { toast } from '../lib/toast';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productId ? getProductById(productId) : Promise.reject('No product ID'),
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <Button variant="outline" onClick={() => navigate('/')} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
            <p className="mb-4 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>Browse Products</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[400px] max-w-full object-contain"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating.rate) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <p className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</p>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-10 text-center">{quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncreaseQuantity}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className="w-full sm:w-auto gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
