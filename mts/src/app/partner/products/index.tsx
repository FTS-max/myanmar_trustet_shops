'use client';

import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiEye,
  FiTag,
  FiPackage
} from 'react-icons/fi';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
  status: string;
}

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'clothing', name: 'Traditional Clothing' },
    { id: 'handicrafts', name: 'Handicrafts' },
    { id: 'food', name: 'Food & Beverages' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home Decor' }
  ];

  useEffect(() => {
    // Simulate API call to fetch products
    const fetchProducts = async () => {
      // In a real implementation, you would call your API here
      // const response = await fetch('/api/partner/products');
      // const data = await response.json();
      
      // Mock data for demonstration
      setTimeout(() => {
        setProducts([
          {
            id: 'prod-001',
            name: 'Myanmar Traditional Longyi',
            description: 'Handwoven traditional longyi with authentic Myanmar patterns',
            price: 25000,
            stock: 45,
            category: 'clothing',
            image: '/images/products/longyi.jpg',
            createdAt: '2023-09-15T10:30:00Z',
            status: 'active'
          },
          {
            id: 'prod-002',
            name: 'Handmade Bamboo Basket',
            description: 'Eco-friendly bamboo basket made by local artisans',
            price: 18000,
            stock: 32,
            category: 'handicrafts',
            image: '/images/products/basket.jpg',
            createdAt: '2023-09-20T14:45:00Z',
            status: 'active'
          },
          {
            id: 'prod-003',
            name: 'Organic Shan Tea',
            description: 'Premium organic tea from Shan State highlands',
            price: 12000,
            stock: 78,
            category: 'food',
            image: '/images/products/tea.jpg',
            createdAt: '2023-09-25T09:15:00Z',
            status: 'active'
          },
          {
            id: 'prod-004',
            name: 'Burmese Lacquerware Bowl',
            description: 'Traditional lacquerware bowl with intricate designs',
            price: 35000,
            stock: 15,
            category: 'home',
            image: '/images/products/lacquerware.jpg',
            createdAt: '2023-09-28T11:20:00Z',
            status: 'active'
          },
          {
            id: 'prod-005',
            name: 'Thanaka Wood Cosmetic Set',
            description: 'Natural thanaka wood with grinding stone for traditional cosmetic',
            price: 22000,
            stock: 25,
            category: 'accessories',
            image: '/images/products/thanaka.jpg',
            createdAt: '2023-10-02T16:10:00Z',
            status: 'active'
          },
          {
            id: 'prod-006',
            name: 'Myanmar Silver Jewelry Set',
            description: 'Handcrafted silver jewelry with traditional Myanmar motifs',
            price: 85000,
            stock: 8,
            category: 'accessories',
            image: '/images/products/jewelry.jpg',
            createdAt: '2023-10-05T13:40:00Z',
            status: 'active'
          },
          {
            id: 'prod-007',
            name: 'Chin Traditional Woven Scarf',
            description: 'Colorful hand-woven scarf from Chin State',
            price: 28000,
            stock: 18,
            category: 'clothing',
            image: '/images/products/scarf.jpg',
            createdAt: '2023-10-08T10:05:00Z',
            status: 'active'
          },
          {
            id: 'prod-008',
            name: 'Burmese Dried Mango',
            description: 'Sweet and tangy dried mango slices from Mandalay',
            price: 8000,
            stock: 50,
            category: 'food',
            image: '/images/products/mango.jpg',
            createdAt: '2023-10-10T15:30:00Z',
            status: 'active'
          }
        ]);
        setIsLoading(false);
      }, 1500);
    };

    fetchProducts();
  }, []);

  // Format currency in MMK
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MM', {
      style: 'currency',
      currency: 'MMK',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Open delete confirmation modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Handle product deletion
  const handleDeleteProduct = () => {
    // In a real implementation, you would call your API here
    // await fetch(`/api/partner/products/${productToDelete.id}`, { method: 'DELETE' });
    
    // Update local state
    setProducts(products.filter(product => product.id !== productToDelete.id));
    closeDeleteModal();
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Apply search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply category filter
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'stock-high':
          return b.stock - a.stock;
        case 'stock-low':
          return a.stock - b.stock;
        default:
          return 0;
      }
    });

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <div className="h-10 bg-gray-200 rounded w-full md:w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded w-full md:w-1/4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <Link 
          href="/partner/products/new" 
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center transition duration-200"
        >
          <FiPlus className="mr-2" />
          Add New Product
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4 w-full md:w-2/3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="relative w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <select
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="stock-high">Stock: High to Low</option>
            <option value="stock-low">Stock: Low to High</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-200">
              <div className="relative h-48 bg-gray-200">
                {/* In a real app, you would use next/image for optimized images */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <FiPackage size={48} />
                </div>
                {product.stock < 10 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Low Stock: {product.stock}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <FiTag className="mr-1" size={12} />
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-700">{formatCurrency(product.price)}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Link 
                    href={`/partner/products/${product.id}`} 
                    className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
                  >
                    <FiEye className="mr-1" /> View
                  </Link>
                  
                  <div className="flex space-x-2">
                    <Link 
                      href={`/partner/products/${product.id}/edit`} 
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    >
                      <FiEdit2 className="mr-1" /> Edit
                    </Link>
                    
                    <button 
                      onClick={() => openDeleteModal(product)} 
                      className="text-red-600 hover:text-red-800 flex items-center text-sm"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || categoryFilter !== 'all' ? 
              'Try adjusting your search or filter to find what you\'re looking for.' : 
              'Get started by adding your first product.'}
          </p>
          {!searchTerm && categoryFilter === 'all' && (
            <div className="mt-6">
              <Link 
                href="/partner/products/new" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add New Product
              </Link>
            </div>
          )}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <FiTrash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">Delete Product</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <span className="font-medium">{productToDelete?.name}</span>? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
