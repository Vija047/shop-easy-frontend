
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getAllCategories, getProductsByCategory, Product } from '../services/api';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Loader2, Search } from 'lucide-react';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch all products
  const productsQuery = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => selectedCategory 
      ? getProductsByCategory(selectedCategory) 
      : getAllProducts(),
  });
  
  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  // Filter products by search query
  const filteredProducts = productsQuery.data?.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Products</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              size="sm"
            >
              All
            </Button>
            
            {categoriesQuery.isLoading ? (
              <Button variant="ghost" disabled size="sm">
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            ) : (
              categoriesQuery.data?.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))
            )}
          </div>
        </div>
        
        {/* Product grid */}
        {productsQuery.isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : productsQuery.isError ? (
          <div className="text-center text-destructive">
            Error loading products. Please try again.
          </div>
        ) : filteredProducts && filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="product-grid animate-fadeIn">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
