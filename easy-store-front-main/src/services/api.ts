
// Base API URL
const API_URL = 'https://fakestoreapi.com';

// Interface for API responses
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Authentication Functions
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

// Product Functions
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  
  return response.json();
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products in category ${category}`);
  }
  
  return response.json();
};

export const getAllCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};
