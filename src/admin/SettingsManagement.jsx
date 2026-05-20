import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Save, Mail, Globe, Shield, Loader2, CheckCircle, Info, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsManagement = () => {
  const [config, setConfig] = useState(null);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, settingsRes] = await Promise.all([
          axios.get('/api/config'),
          axios.get('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setConfig(configRes.data || {
          siteName: 'Pharma Universal',
          logo: '/logo.png',
          contact: { address: '', email: '', phone: '', supportEmail: '' },
          seo: { title: '', description: '', keywords: '', ogImage: '' },
          socialLinks: { facebook: '', twitter: '', instagram: '', vimeo: '' }
        });
        setSettings(settingsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleConfigChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setConfig({
        ...config,
        [section]: { ...config[section], [name]: value }
      });
    } else {
      setConfig({ ...config, [name]: value });
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/api/admin/config', config, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Configuration saved successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Error saving configuration', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleSettingUpdate = async (key, value) => {
    try {
      await axios.post('/api/settings', { key, value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
      setMessage({ text: `${key} updated successfully!`, type: 'success' });
    } catch (err) {
      setMessage({ text: `Error updating ${key}`, type: 'error' });
    } finally {
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full py-20">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  return (
    <div className="space-y-8 max-w-5xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings & Configuration</h1>
          <p className="text-slate-500">Manage site-wide settings, contact information, and email configuration.</p>
        </div>
        <button 
          onClick={handleSaveConfig} disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-70 cursor-pointer"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save All Changes
        </button>
      </div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl flex items-center gap-3 ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}
        >
          {message.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
          <p className="font-medium">{message.text}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Site Config */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Globe size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">General Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Site Name</label>
              <input 
                type="text" name="siteName" value={config.siteName} onChange={(e) => handleConfigChange(e)}
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Logo URL</label>
              <input 
                type="text" name="logo" value={config.logo} onChange={(e) => handleConfigChange(e)}
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Email</label>
                <input 
                  type="email" name="email" value={config.contact.email} onChange={(e) => handleConfigChange(e, 'contact')}
                  className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Phone</label>
                <input 
                  type="text" name="phone" value={config.contact.phone} onChange={(e) => handleConfigChange(e, 'contact')}
                  className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Support Email</label>
                <input 
                  type="email" name="supportEmail" value={config.contact.supportEmail} onChange={(e) => handleConfigChange(e, 'contact')}
                  className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
              <div className="col-span-full">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                <textarea 
                  name="address" value={config.contact.address} onChange={(e) => handleConfigChange(e, 'contact')} rows="2"
                  className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Search size={20} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">SEO Configuration</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Meta Title</label>
              <input 
                type="text" name="title" value={config.seo.title} onChange={(e) => handleConfigChange(e, 'seo')}
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Meta Description</label>
              <textarea 
                name="description" value={config.seo.description} onChange={(e) => handleConfigChange(e, 'seo')} rows="3"
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Keywords</label>
              <input 
                type="text" name="keywords" value={config.seo.keywords} onChange={(e) => handleConfigChange(e, 'seo')}
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">OG Image URL</label>
              <input 
                type="text" name="ogImage" value={config.seo.ogImage} onChange={(e) => handleConfigChange(e, 'seo')}
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Info size={20} className="text-purple-600" />
            <h2 className="text-lg font-bold text-slate-900">Social Media Links</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Facebook</label>
              <input 
                type="text" name="facebook" value={config.socialLinks.facebook} onChange={(e) => handleConfigChange(e, 'socialLinks')}
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Twitter</label>
              <input 
                type="text" name="twitter" value={config.socialLinks.twitter} onChange={(e) => handleConfigChange(e, 'socialLinks')}
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Instagram</label>
              <input 
                type="text" name="instagram" value={config.socialLinks.instagram} onChange={(e) => handleConfigChange(e, 'socialLinks')}
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vimeo</label>
              <input 
                type="text" name="vimeo" value={config.socialLinks.vimeo} onChange={(e) => handleConfigChange(e, 'socialLinks')}
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
          </div>
        </section>

        {/* SMTP Settings */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Mail size={20} className="text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">Email Configuration (SMTP)</h2>
          </div>
          <div className="p-6 space-y-4">
            {settings.find(s => s.key === 'smtp_config') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SMTP Host</label>
                  <input 
                    type="text" defaultValue={settings.find(s => s.key === 'smtp_config').value.host}
                    onBlur={(e) => {
                      const newVal = {...settings.find(s => s.key === 'smtp_config').value, host: e.target.value};
                      handleSettingUpdate('smtp_config', newVal);
                    }}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SMTP Port</label>
                  <input 
                    type="number" defaultValue={settings.find(s => s.key === 'smtp_config').value.port}
                    onBlur={(e) => {
                      const newVal = {...settings.find(s => s.key === 'smtp_config').value, port: parseInt(e.target.value)};
                      handleSettingUpdate('smtp_config', newVal);
                    }}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sender Name</label>
                  <input 
                    type="text" defaultValue={settings.find(s => s.key === 'smtp_config').value.senderName || ''}
                    onBlur={(e) => {
                      const oldVal = settings.find(s => s.key === 'smtp_config').value;
                      const newVal = {...oldVal, senderName: e.target.value};
                      handleSettingUpdate('smtp_config', newVal);
                    }}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sender Email</label>
                  <input 
                    type="email" defaultValue={settings.find(s => s.key === 'smtp_config').value.senderEmail || ''}
                    onBlur={(e) => {
                      const oldVal = settings.find(s => s.key === 'smtp_config').value;
                      const newVal = {...oldVal, senderEmail: e.target.value};
                      handleSettingUpdate('smtp_config', newVal);
                    }}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SMTP User</label>
                  <input 
                    type="text" defaultValue={settings.find(s => s.key === 'smtp_config').value.auth.user}
                    onBlur={(e) => {
                      const oldVal = settings.find(s => s.key === 'smtp_config').value;
                      const newVal = {...oldVal, auth: {...oldVal.auth, user: e.target.value}};
                      handleSettingUpdate('smtp_config', newVal);
                    }}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SMTP Password</label>
                  <input 
                    type="password" defaultValue={settings.find(s => s.key === 'smtp_config').value.auth.pass || ''}
                    onBlur={(e) => {
                      const oldVal = settings.find(s => s.key === 'smtp_config').value;
                      const newVal = {...oldVal, auth: {...oldVal.auth, pass: e.target.value}};
                      handleSettingUpdate('smtp_config', newVal);
                    }}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
                <div className="col-span-full pt-4 border-t border-slate-50">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notification Email</label>
                  <input 
                    type="email" defaultValue={settings.find(s => s.key === 'admin_notify_email')?.value}
                    onBlur={(e) => handleSettingUpdate('admin_notify_email', e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500/20 text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsManagement;
