
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          ShopEase
        </Link>
        
        {isAuthenticated ? (
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors hidden sm:block">
              Home
            </Link>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        ) : (
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
