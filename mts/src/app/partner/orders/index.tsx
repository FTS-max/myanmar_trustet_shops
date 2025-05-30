'use client';

import { useState, useEffect } from 'react';
import { 
  FiShoppingBag, 
  FiSearch, 
  FiFilter, 
  FiCalendar,
  FiEye,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiPackage,
  FiAlertCircle,
  FiDownload
} from 'react-icons/fi';
import Link from 'next/link';

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Status options for filter
  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'pending', name: 'Pending' },
    { id: 'processing', name: 'Processing' },
    { id: 'shipped', name: 'Shipped' },
    { id: 'delivered', name: 'Delivered' },
    { id: 'cancelled', name: 'Cancelled' }
  ];

  // Date filter options
  const dateOptions = [
    { id: 'all', name: 'All Time' },
    { id: 'today', name: 'Today' },
    { id: 'yesterday', name: 'Yesterday' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'custom', name: 'Custom Range' }
  ];

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      // In a real implementation, you would call your API here
      // const response = await fetch('/api/partner/orders');
      // const data = await response.json();
      
      // Mock data for demonstration
      setTimeout(() => {
        setOrders([
          {
            id: 'ORD-001',
            customer: {
              name: 'Aung Aung',
              email: 'aung@example.com',
              phone: '+95 9123456789'
            },
            orderDate: '2023-10-15T14:30:00Z',
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'card',
            totalAmount: 45000,
            items: [
              { id: 'ITEM-001', name: 'Myanmar Traditional Longyi', quantity: 1, price: 25000 },
              { id: 'ITEM-002', name: 'Handmade Bamboo Basket', quantity: 1, price: 18000 }
            ],
            shippingAddress: {
              street: '123 Yangon Street',
              city: 'Yangon',
              state: 'Yangon Region',
              postalCode: '11181',
              country: 'Myanmar'
            },
            shippingFee: 2000,
            notes: ''
          },
          {
            id: 'ORD-002',
            customer: {
              name: 'Mya Mya',
              email: 'mya@example.com',
              phone: '+95 9987654321'
            },
            orderDate: '2023-10-14T10:15:00Z',
            status: 'processing',
            paymentStatus: 'paid',
            paymentMethod: 'bank_transfer',
            totalAmount: 78000,
            items: [
              { id: 'ITEM-003', name: 'Burmese Lacquerware Bowl', quantity: 2, price: 35000 },
              { id: 'ITEM-004', name: 'Organic Shan Tea', quantity: 1, price: 12000 }
            ],
            shippingAddress: {
              street: '456 Mandalay Road',
              city: 'Mandalay',
              state: 'Mandalay Region',
              postalCode: '05001',
              country: 'Myanmar'
            },
            shippingFee: 3000,
            notes: 'Please gift wrap the items.'
          },
          {
            id: 'ORD-003',
            customer: {
              name: 'Kyaw Kyaw',
              email: 'kyaw@example.com',
              phone: '+95 9555123456'
            },
            orderDate: '2023-10-13T16:45:00Z',
            status: 'shipped',
            paymentStatus: 'paid',
            paymentMethod: 'cash_on_delivery',
            totalAmount: 120000,
            items: [
              { id: 'ITEM-005', name: 'Myanmar Silver Jewelry Set', quantity: 1, price: 85000 },
              { id: 'ITEM-006', name: 'Thanaka Wood Cosmetic Set', quantity: 1, price: 22000 },
              { id: 'ITEM-007', name: 'Burmese Dried Mango', quantity: 2, price: 8000 }
            ],
            shippingAddress: {
              street: '789 Taunggyi Lane',
              city: 'Taunggyi',
              state: 'Shan State',
              postalCode: '06001',
              country: 'Myanmar'
            },
            shippingFee: 5000,
            notes: 'Call before delivery.'
          },
          {
            id: 'ORD-004',
            customer: {
              name: 'Su Su',
              email: 'su@example.com',
              phone: '+95 9444789123'
            },
            orderDate: '2023-10-12T09:20:00Z',
            status: 'pending',
            paymentStatus: 'pending',
            paymentMethod: 'bank_transfer',
            totalAmount: 35000,
            items: [
              { id: 'ITEM-008', name: 'Chin Traditional Woven Scarf', quantity: 1, price: 28000 },
              { id: 'ITEM-009', name: 'Burmese Dried Mango', quantity: 1, price: 8000 }
            ],
            shippingAddress: {
              street: '101 Mawlamyine Street',
              city: 'Mawlamyine',
              state: 'Mon State',
              postalCode: '12001',
              country: 'Myanmar'
            },
            shippingFee: 4000,
            notes: ''
          },
          {
            id: 'ORD-005',
            customer: {
              name: 'Tun Tun',
              email: 'tun@example.com',
              phone: '+95 9333456789'
            },
            orderDate: '2023-10-11T13:10:00Z',
            status: 'cancelled',
            paymentStatus: 'refunded',
            paymentMethod: 'card',
            totalAmount: 92000,
            items: [
              { id: 'ITEM-010', name: 'Myanmar Traditional Longyi', quantity: 2, price: 25000 },
              { id: 'ITEM-011', name: 'Myanmar Silver Jewelry Set', quantity: 1, price: 85000 }
            ],
            shippingAddress: {
              street: '202 Bago Road',
              city: 'Bago',
              state: 'Bago Region',
              postalCode: '08001',
              country: 'Myanmar'
            },
            shippingFee: 3000,
            notes: 'Customer requested cancellation.'
          },
          {
            id: 'ORD-006',
            customer: {
              name: 'Win Win',
              email: 'win@example.com',
              phone: '+95 9222987654'
            },
            orderDate: '2023-10-10T11:30:00Z',
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'cash_on_delivery',
            totalAmount: 65000,
            items: [
              { id: 'ITEM-012', name: 'Burmese Lacquerware Bowl', quantity: 1, price: 35000 },
              { id: 'ITEM-013', name: 'Handmade Bamboo Basket', quantity: 1, price: 18000 },
              { id: 'ITEM-014', name: 'Organic Shan Tea', quantity: 1, price: 12000 }
            ],
            shippingAddress: {
              street: '303 Pathein Lane',
              city: 'Pathein',
              state: 'Ayeyarwady Region',
              postalCode: '10001',
              country: 'Myanmar'
            },
            shippingFee: 5000,
            notes: ''
          }
        ]);
        setIsLoading(false);
      }, 1500);
    };

    fetchOrders();
  }, []);

  // Format currency in MMK
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MM', {
      style: 'currency',
      currency: 'MMK',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status icon and color
  const getStatusDetails = (status) => {
    switch (status) {
      case 'pending':
        return { 
          icon: <FiClock className="mr-1" />, 
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Pending'
        };
      case 'processing':
        return { 
          icon: <FiPackage className="mr-1" />, 
          color: 'bg-blue-100 text-blue-800',
          text: 'Processing'
        };
      case 'shipped':
        return { 
          icon: <FiTruck className="mr-1" />, 
          color: 'bg-purple-100 text-purple-800',
          text: 'Shipped'
        };
      case 'delivered':
        return { 
          icon: <FiCheckCircle className="mr-1" />, 
          color: 'bg-green-100 text-green-800',
          text: 'Delivered'
        };
      case 'cancelled':
        return { 
          icon: <FiXCircle className="mr-1" />, 
          color: 'bg-red-100 text-red-800',
          text: 'Cancelled'
        };
      default:
        return { 
          icon: <FiAlertCircle className="mr-1" />, 
          color: 'bg-gray-100 text-gray-800',
          text: status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Apply search filter
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply status filter
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      // Apply date filter
      let matchesDate = true;
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      
      switch (dateFilter) {
        case 'today':
          matchesDate = orderDate >= today;
          break;
        case 'yesterday':
          matchesDate = orderDate >= yesterday && orderDate < today;
          break;
        case 'week':
          matchesDate = orderDate >= weekStart;
          break;
        case 'month':
          matchesDate = orderDate >= monthStart;
          break;
        case 'custom':
          // In a real app, you would implement a date range picker
          matchesDate = true;
          break;
        default: // 'all'
          matchesDate = true;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'newest':
          return new Date(b.orderDate) - new Date(a.orderDate);
        case 'oldest':
          return new Date(a.orderDate) - new Date(b.orderDate);
        case 'amount-high':
          return b.totalAmount - a.totalAmount;
        case 'amount-low':
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-12 bg-gray-200 w-full"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 w-full mt-2"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center transition duration-200"
          onClick={() => alert('Export functionality would be implemented here')}
        >
          <FiDownload className="mr-2" />
          Export Orders
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-2/3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              {statusOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiCalendar className="text-gray-400" />
            </div>
            <select
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
              value={dateFilter}
              onChange={handleDateChange}
            >
              {dateOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
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
            <option value="amount-high">Amount: High to Low</option>
            <option value="amount-low">Amount: Low to High</option>
          </select>
        </div>
      </div>
      
      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => {
                  const statusDetails = getStatusDetails(order.status);
                  
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                        <Link href={`/partner/orders/${order.id}`} className="hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                          <span className="flex items-center">
                            {statusDetails.icon}
                            {statusDetails.text}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/partner/orders/${order.id}`} 
                          className="text-purple-600 hover:text-purple-900 mr-4"
                        >
                          <span className="flex items-center justify-end">
                            <FiEye className="mr-1" /> View
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">
                      {indexOfLastOrder > filteredOrders.length ? filteredOrders.length : indexOfLastOrder}
                    </span> of <span className="font-medium">{filteredOrders.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === pageNumber ? 'z-10 bg-purple-50 border-purple-500 text-purple-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? 
              'Try adjusting your search or filters to find what you\'re looking for.' : 
              'You haven\'t received any orders yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
