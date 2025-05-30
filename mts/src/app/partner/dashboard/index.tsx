'use client';

import { useState, useEffect } from 'react';
import { 
  FiShoppingBag, 
  FiDollarSign, 
  FiUsers, 
  FiPackage, 
  FiTrendingUp, 
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';
import Link from 'next/link';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    lowStockProducts: [],
    salesData: []
  });

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      // In a real implementation, you would call your API here
      // const response = await fetch('/api/partner/dashboard');
      // const data = await response.json();
      
      // Mock data for demonstration
      setTimeout(() => {
        setDashboardData({
          totalSales: 1250000,
          totalOrders: 48,
          totalCustomers: 32,
          totalProducts: 75,
          recentOrders: [
            { id: 'ORD-001', customer: 'Aung Aung', amount: 45000, status: 'completed', date: '2023-10-15' },
            { id: 'ORD-002', customer: 'Mya Mya', amount: 78000, status: 'processing', date: '2023-10-14' },
            { id: 'ORD-003', customer: 'Kyaw Kyaw', amount: 120000, status: 'completed', date: '2023-10-13' },
            { id: 'ORD-004', customer: 'Su Su', amount: 35000, status: 'pending', date: '2023-10-12' },
            { id: 'ORD-005', customer: 'Tun Tun', amount: 92000, status: 'completed', date: '2023-10-11' },
          ],
          lowStockProducts: [
            { id: 'PRD-001', name: 'Myanmar Traditional Shirt', stock: 2, threshold: 5 },
            { id: 'PRD-002', name: 'Handmade Bamboo Basket', stock: 3, threshold: 5 },
            { id: 'PRD-003', name: 'Organic Shan Tea', stock: 4, threshold: 10 },
          ],
          salesData: [
            { date: '2023-10-09', amount: 120000 },
            { date: '2023-10-10', amount: 85000 },
            { date: '2023-10-11', amount: 190000 },
            { date: '2023-10-12', amount: 145000 },
            { date: '2023-10-13', amount: 210000 },
            { date: '2023-10-14', amount: 180000 },
            { date: '2023-10-15', amount: 320000 },
          ]
        });
        setIsLoading(false);
      }, 1500);
    };

    fetchDashboardData();
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-200 h-96 rounded-lg"></div>
            <div className="bg-gray-200 h-96 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Partner Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(dashboardData.totalSales)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="mr-1" />
            <span>12% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiShoppingBag size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.totalOrders}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="mr-1" />
            <span>8% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.totalCustomers}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="mr-1" />
            <span>5% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FiPackage size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.totalProducts}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <FiPackage className="mr-1" />
            <Link href="/partner/products" className="hover:underline">Manage inventory</Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <Link href="/partner/orders" className="text-purple-600 hover:text-purple-800 text-sm font-medium hover:underline flex items-center">
              View All <FiShoppingBag className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-purple-600">
                      <Link href={`/partner/orders/${order.id}`} className="hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(order.amount)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatDate(order.date)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Inventory Alerts</h2>
            <Link href="/partner/products" className="text-purple-600 hover:text-purple-800 text-sm font-medium hover:underline flex items-center">
              View All <FiPackage className="ml-1" />
            </Link>
          </div>
          
          {dashboardData.lowStockProducts.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.lowStockProducts.map((product) => (
                <div key={product.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiAlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3 w-full">
                      <h3 className="text-sm font-medium text-red-800">
                        Low Stock: {product.name}
                      </h3>
                      <div className="mt-2 text-sm text-red-700 flex justify-between items-center">
                        <span>Current Stock: {product.stock}</span>
                        <Link href={`/partner/products/${product.id}`} className="text-red-800 hover:text-red-900 font-medium hover:underline">
                          Restock
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-green-200 rounded-lg p-4 bg-green-50 flex items-start">
              <div className="flex-shrink-0">
                <FiCheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  All products are well-stocked
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  Your inventory levels are healthy.
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/partner/products/new" className="inline-flex items-center justify-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Add Product
              </Link>
              <Link href="/partner/orders" className="inline-flex items-center justify-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                View Orders
              </Link>
            </div>
          </div>
          
          {/* Calendar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Upcoming</h3>
              <span className="text-sm text-gray-500 flex items-center">
                <FiCalendar className="mr-1" /> October 2023
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                <div className="flex-shrink-0">
                  <FiClock className="h-5 w-5 text-purple-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-800">Promotion Ending</p>
                  <p className="text-xs text-purple-700 mt-1">Shan Festival Discount - Oct 20, 2023</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <FiClock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Inventory Check</p>
                  <p className="text-xs text-blue-700 mt-1">Monthly Stock Review - Oct 31, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
