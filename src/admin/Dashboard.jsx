import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const statsCards = [
    { 
      label: 'Total Revenue', 
      value: `$${data?.stats.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'bg-emerald-500',
      trend: '+12.5%',
      up: true
    },
    { 
      label: 'Total Orders', 
      value: data?.stats.totalOrders, 
      icon: ShoppingCart, 
      color: 'bg-blue-500',
      trend: '+5.2%',
      up: true
    },
    { 
      label: 'Total Products', 
      value: data?.stats.totalProducts, 
      icon: Package, 
      color: 'bg-amber-500',
      trend: '+2.1%',
      up: true
    },
    { 
      label: 'Total Users', 
      value: data?.stats.totalUsers, 
      icon: Users, 
      color: 'bg-purple-500',
      trend: '+8.4%',
      up: true
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-2xl ${card.color} text-white shadow-lg`}>
                <card.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${card.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{card.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
            <button className="text-blue-600 text-sm font-semibold hover:underline cursor-pointer">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-slate-400">#{order._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{order.billingDetails.firstName} {order.billingDetails.lastName}</div>
                      <div className="text-xs text-slate-500">{order.billingDetails.email}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-600' :
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats / Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Clock size={18} />
                  </div>
                  {i !== 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-100"></div>}
                </div>
                <div>
                  <p className="text-sm text-slate-900 font-medium">System Update</p>
                  <p className="text-xs text-slate-500">Inventory sync completed successfully</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl transition-all">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
