import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, CheckCircle } from 'lucide-react';
import { toast } from '../lib/toast';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setOrderSuccess(true);
      clearCart();
      
      // Show success toast
      toast.success("Order placed successfully!");
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        setOrderSuccess(false);
        setIsCheckingOut(false);
      }, 4000);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="p-8 max-w-lg mx-auto text-center animate-fadeIn">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
          <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Button>
        </div>
        
        {cartItems.length === 0 ? (
          <Card className="p-8 text-center animate-fadeIn">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="mb-4 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
            <Button onClick={() => navigate('/')}>Browse Products</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4 animate-fadeIn">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-grow flex flex-col">
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                            {item.title}
                          </Link>
                          <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                        </div>
                        
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-10 text-center">{item.quantity}</span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-destructive h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="animate-fadeIn">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <span className="mr-2">Processing...</span>
                        <Minus className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      'Checkout'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
