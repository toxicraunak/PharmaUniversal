import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Eye, Trash2, Loader2, CheckCircle, Clock, Truck, PackageCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`/api/admin/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchOrders();
      } catch (err) {
        alert('Error deleting order');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={16} className="text-amber-500" />;
      case 'Shipped': return <Truck size={16} className="text-blue-500" />;
      case 'Completed': return <CheckCircle size={16} className="text-emerald-500" />;
      default: return <PackageCheck size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-500">Manage customer orders and shipments.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" size={32} /></td></tr>
              ) : orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-slate-400">#{order._id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{order.billingDetails.firstName} {order.billingDetails.lastName}</div>
                    <div className="text-xs text-slate-500">{order.billingDetails.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{order.items.length} Product(s)</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-slate-50 border-none rounded-lg text-xs font-bold py-1 px-2 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-all cursor-pointer"><Eye size={18} /></button>
                      <button onClick={() => deleteOrder(order._id)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
