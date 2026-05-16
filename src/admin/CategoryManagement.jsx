import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Loader2, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', label: '', slug: '', image: '' });

  const token = localStorage.getItem('adminToken');

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/admin/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ 
        name: category.name, 
        label: category.label || '', 
        slug: category.slug || '', 
        image: category.image || '' 
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', label: '', slug: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`/api/admin/categories/${editingCategory._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/categories', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      alert('Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category? This might affect products in this category.')) {
      try {
        await axios.delete(`/api/admin/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCategories();
      } catch (err) {
        alert('Error deleting category');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500">Organize your products into categories.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : categories.map((cat) => (
          <motion.div 
            layout
            key={cat._id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">
                {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <Grid size={24} className="text-slate-400" />}
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleOpenModal(cat)} className="p-2 text-slate-400 hover:text-blue-600 transition-all cursor-pointer">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(cat._id)} className="p-2 text-slate-400 hover:text-red-500 transition-all cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs font-mono text-slate-400">{cat.slug}</p>
              <p className="text-sm text-slate-500 mt-2 line-clamp-1">{cat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Internal Name</label>
                    <input 
                      type="text" required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g. Pain Relief"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                    <input 
                      type="text" required value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                      className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="pain-relief"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Display Label</label>
                  <input 
                    type="text" required value={formData.label}
                    onChange={(e) => setFormData({...formData, label: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Best Pain Relief Medicines"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                  <input 
                    type="text" value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManagement;
