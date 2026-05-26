import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Plus, Edit2, Trash2, Save, X, LayoutDashboard, Settings, Tags } from 'lucide-react';
import { Product } from '../types';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const { products, loading, refetch } = useProducts();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  
  // Category State
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isManagingCategories, setIsManagingCategories] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/categories')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(console.error);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'limon69') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-24 flex justify-center items-center h-full">
        <div className="glass-card rounded-2xl p-8 border border-white/10 text-center w-full">
          <div className="mx-auto w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-lg border border-gold-500/20">
            <LayoutDashboard className="h-8 w-8 text-gold-500" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Admin Access</h2>
          <p className="text-zinc-400 text-sm mb-8">Please enter the administrator password to continue.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-gold-500 focus:outline-none text-center tracking-widest"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-zinc-950 font-bold rounded-lg transition-transform hover:-translate-y-1 uppercase tracking-wider"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'number') {
      finalValue = value === '' ? null : Number(value);
    } else if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, images: [reader.result as string] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(product.id);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      price: 0,
      discountPrice: null,
      category: categories.length > 0 ? categories[0] : 'Smartphones',
      stock: 0,
      images: [''],
      featured: false,
      trending: false,
      newArrival: false,
      description: ''
    });
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({});
  };

  const saveProduct = async () => {
    try {
      const url = isAdding ? '/api/products' : `/api/products/${formData.id}`;
      const method = isAdding ? 'POST' : 'PUT';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      await refetch();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      await refetch();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (catToRemove: string) => {
    setCategories(categories.filter(c => c !== catToRemove));
  };

  const saveCategories = async () => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories)
      });
      alert('Categories saved successfully!');
    } catch(err) {
      console.error("Failed to save categories", err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-8 sm:mb-12">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 sm:p-3 bg-zinc-900 rounded-xl border border-white/10 shrink-0">
            <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8 text-gold-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              Admin <span className="gold-text-gradient">Dashboard</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">Manage products, inventory, and pricing.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {!isAdding && !isEditing && (
            <>
              <button 
                onClick={() => setIsManagingCategories(!isManagingCategories)}
                className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-transform flex items-center justify-center space-x-2 shrink-0 border ${isManagingCategories ? 'bg-zinc-800 text-white border-white/10' : 'bg-transparent text-zinc-300 border-white/10 hover:bg-zinc-900 hover:text-white'}`}
              >
                <Tags className="h-5 w-5" />
                <span>{isManagingCategories ? 'Close Categories' : 'Manage Categories'}</span>
              </button>
              <button 
                onClick={handleAdd}
                className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-400 text-zinc-950 font-semibold rounded-lg transition-transform hover:-translate-y-1 flex items-center justify-center space-x-2 shrink-0"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
            </>
          )}
        </div>
      </div>

      {isManagingCategories && !isAdding && !isEditing && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide text-sm">
              Manage Categories <span className="text-gold-500">({categories.length})</span>
            </h2>
            <span className="text-[10px] text-gold-500 font-bold tracking-widest uppercase">Dynamic List</span>
          </div>
          
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="e.g. Jeans, Oversized Tees, Gift Sets" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
              className="flex-grow px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-gold-500 focus:outline-none"
            />
            <button 
              onClick={handleAddCategory}
              className="px-6 bg-gold-500 hover:bg-gold-400 text-black rounded-lg transition-colors flex items-center justify-center font-bold text-xl"
            >
              +
            </button>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <div key={i} className="bg-zinc-800/80 border border-white/10 text-white px-3 py-2 rounded-lg flex items-center gap-3 text-sm transition-colors hover:bg-zinc-800 group">
                <span className="truncate max-w-[150px] sm:max-w-[200px]">{cat}</span>
                <button 
                  onClick={() => handleRemoveCategory(cat)}
                  className="text-zinc-500 hover:text-red-400 transition-colors focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-zinc-500 text-sm italic w-full text-center py-8">
                No categories added. Add some categories above.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6 uppercase tracking-wider font-semibold">
            <span className="text-gold-500">💡</span> Remember to click "Save Settings Changes" below to persist your new lists.
          </div>

          <button 
            onClick={saveCategories}
            className="w-full sm:w-auto px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Save className="h-4 w-4" /> Save Settings Changes
          </button>
        </div>
      )}

      {(isAdding || isEditing) ? (
        <div className="glass-card rounded-2xl p-8 mb-8 border border-gold-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
          <h2 className="text-2xl font-display font-bold text-white mb-6">
            {isAdding ? 'Add New Product' : 'Edit Product'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Product Name</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-gold-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
              <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-gold-500 focus:outline-none">
                {categories.length > 0 ? categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                )) : ['Smartphones', 'Smart Watches', 'Headphones', 'Earbuds', 'Power Banks', 'Accessories'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Price (৳)</label>
              <input type="number" name="price" value={formData.price || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-gold-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-500/10 file:text-gold-500 hover:file:bg-gold-500/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
              <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:border-gold-500 focus:outline-none"></textarea>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={cancelEdit} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center space-x-2">
              <X className="h-5 w-5" /> <span>Cancel</span>
            </button>
            <button onClick={saveProduct} className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-zinc-950 font-semibold rounded-lg transition-colors flex items-center space-x-2">
              <Save className="h-5 w-5" /> <span>Save Product</span>
            </button>
          </div>
        </div>
      ) : null}

      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-white/10">
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-zinc-400 uppercase">Product</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-zinc-400 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-zinc-400 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-zinc-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">Loading products...</td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                        <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800'} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="font-medium text-white">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">৳{product.discountPrice || product.price}</div>
                    {product.discountPrice && <div className="text-xs text-zinc-500 line-through">৳{product.price}</div>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => handleEdit(product)} className="text-zinc-400 hover:text-gold-400 transition-colors">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
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
}
