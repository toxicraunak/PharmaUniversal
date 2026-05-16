import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  Image as ImageIcon,
  Loader2,
  Filter,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    slug: '',
    category: '',
    description: '',
    image: '',
    packages: [{ label: '', price: '', mrp: '' }],
    onSale: false,
    onFooter: false,
    isAvailable: true,
    features: [],
    tags: []
  });

  const token = localStorage.getItem('adminToken');

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/categories', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        category: product.category._id || product.category,
        features: product.features || [],
        tags: product.tags || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        fullName: '',
        slug: '',
        category: categories[0]?._id || '',
        description: '',
        image: '',
        packages: [{ label: '', price: '', mrp: '' }],
        onSale: false,
        onFooter: false,
        isAvailable: true,
        features: [],
        tags: []
      });
    }
    setIsModalOpen(true);
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...formData.packages];
    newPackages[index][field] = value;
    setFormData({ ...formData, packages: newPackages });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { label: '', price: '', mrp: '' }]
    });
  };

  const removePackage = (index) => {
    const newPackages = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: newPackages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`/api/admin/products/${editingProduct._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/products', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
          <p className="text-slate-500">Add, edit or remove products from your store.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <Filter size={18} />
              <span className="text-sm font-semibold">Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-500" size={32} />
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.onSale && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-bold uppercase tracking-tighter">Sale</span>}
                      {product.onFooter && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[10px] font-bold uppercase tracking-tighter">Footer</span>}
                      {product.isAvailable ? <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-bold uppercase tracking-tighter">Available</span> : <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-tighter">Out</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl admin-scrollbar"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Info */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                        <input 
                          type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="Short Name"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                        <input 
                          type="text" required
                          value={formData.slug}
                          onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="product-slug"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Product Name</label>
                      <input 
                        type="text" required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="e.g. Modafinil 200mg Generic Tablets"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                      <select 
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Description (HTML supported)</label>
                      <textarea 
                        rows="6"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-mono"
                        placeholder="Product description..."
                      />
                    </div>
                  </div>

                  {/* Settings & Extras */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Product Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-2xl">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.onSale} onChange={(e) => setFormData({...formData, onSale: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700">On Sale</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.onFooter} onChange={(e) => setFormData({...formData, onFooter: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700">On Footer</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isAvailable} onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700">Available</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Features (one per line)</label>
                      <textarea 
                        rows="3"
                        value={formData.features.join('\n')}
                        onChange={(e) => setFormData({...formData, features: e.target.value.split('\n').filter(f => f.trim())})}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                        placeholder="Strength: 200mg&#10;Form: Tablet&#10;Manufacturer: Pfizer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tags (comma separated)</label>
                      <input 
                        type="text"
                        value={formData.tags.join(', ')}
                        onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                        placeholder="health, medicine, trending"
                      />
                    </div>
                  </div>
                </div>

                {/* Packages Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Pricing Packages</h3>
                    <button 
                      type="button"
                      onClick={addPackage}
                      className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
                    >
                      <Plus size={16} /> Add Package
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.packages.map((pkg, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl">
                        <div className="sm:col-span-2">
                          <input 
                            placeholder="Label (e.g. 30 Pills)"
                            value={pkg.label}
                            onChange={(e) => handlePackageChange(index, 'label', e.target.value)}
                            className="w-full bg-white border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div>
                          <input 
                            type="number" step="0.01"
                            placeholder="Price"
                            value={pkg.price}
                            onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                            className="w-full bg-white border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" step="0.01"
                            placeholder="MRP"
                            value={pkg.mrp}
                            onChange={(e) => handlePackageChange(index, 'mrp', e.target.value)}
                            className="w-full bg-white border-none rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500/20"
                          />
                          <button 
                            type="button"
                            onClick={() => removePackage(index)}
                            className="p-1 text-slate-400 hover:text-red-500"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                  >
                    {editingProduct ? 'Update Product' : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;
