import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Shield, Truck, ShieldCheck, Send, CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(60);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [invoiceText, setInvoiceText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === id);
      setProduct(found || null);
    }
  }, [id, products]);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !fullName || !phoneNumber || !address) {
       alert("Please fill all required fields");
       return;
    }

    const price = product.discountPrice || product.price;
    const total = price + deliveryFee;
    const regionText = deliveryFee === 60 ? "Inside Dhaka" : "Outside Dhaka";

    const text = `🚨 NEW ORDER RECEIVED - TRUSTED MOBILE CARE 🚨

🛒 PRODUCT DETAILS:
-------------------------------------
• Item Name: ${product.name}
• Category: ${product.category}
• Price: ৳${price}
• Product Image Link: (Product Photo attached in system)

👤 CUSTOMER SHIPPING DETAILS:
-------------------------------------
• Name: ${fullName}
• Phone: ${phoneNumber}
• Address: ${address}
• Delivery Area: ${regionText} (৳${deliveryFee})

💰 TOTAL PAYABLE (CASH ON DELIVERY): ৳${total}`;

    setInvoiceText(text);
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setShowModal(true);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      // Still show modal if copy fails, they can copy manually
      setShowModal(true);
      setIsCopied(false);
    });
  };

  const handleManualCopy = () => {
    navigator.clipboard.writeText(invoiceText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-64 w-64 bg-zinc-900 rounded-full mb-8 filter blur-3xl opacity-50"></div>
          <div className="text-gold-500 font-display font-medium tracking-widest uppercase">Loading Product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/" className="text-gold-500 hover:text-gold-400 font-medium">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gold-500/10 rounded-3xl blur-3xl transform scale-90 -z-10"></div>
          <div className="glass-card rounded-3xl p-8 aspect-square flex items-center justify-center border border-white/10">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-zinc-900 border border-gold-500/30 text-gold-500 rounded-full text-xs font-semibold uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-end space-x-4 mb-8">
            <span className="text-4xl font-bold gold-text-gradient">৳{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-xl text-zinc-500 line-through mb-1">৳{product.price}</span>
            )}
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 relative">
            <div className="flex items-center space-x-2 text-gold-500 mb-6 pb-4 border-b border-white/10">
              <Zap className="h-5 w-5" />
              <h3 className="font-bold text-sm tracking-widest uppercase">Fast Order Desk (No Login)</h3>
            </div>

            <form className="space-y-4" onSubmit={handleOrder}>
               <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Your Full Name</label>
                  <input type="text" placeholder="Enter your name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Mobile Contact Phone Number</label>
                  <input type="tel" placeholder="e.g. 017XXXXXXXX" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Delivery Shipping Address</label>
                  <textarea rows={2} placeholder="Apartment, Road, Area, City/District" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 text-sm"></textarea>
               </div>
               
               <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Delivery Region Area</label>
                  <div className="grid grid-cols-2 gap-3">
                     <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${deliveryFee === 60 ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}>
                        <input type="radio" name="region" value={60} checked={deliveryFee === 60} onChange={() => setDeliveryFee(60)} className="hidden" />
                        <span className="text-xs font-semibold">INSIDE DHAKA (+৳60)</span>
                     </label>
                     <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${deliveryFee === 120 ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}>
                        <input type="radio" name="region" value={120} checked={deliveryFee === 120} onChange={() => setDeliveryFee(120)} className="hidden" />
                        <span className="text-xs font-semibold">OUTSIDE DHAKA (+৳120)</span>
                     </label>
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-white/5 my-6">
                  <span className="text-sm font-semibold text-white">Total Amount (Cash on Delivery):</span>
                  <span className="text-xl font-bold text-gold-500">৳{(product.discountPrice || product.price) + deliveryFee}</span>
               </div>

               <button type="submit" className="w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 bg-gold-500 hover:bg-gold-400 text-zinc-950 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:-translate-y-1 uppercase tracking-widest text-sm">
                  <Send className="h-5 w-5" />
                  <span>Order Directly</span>
               </button>
            </form>
          </div>

          <div className="mt-12">
            <h4 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider">Specifications & Details</h4>
            <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
              {product.description || "Premium quality product from Trusted Mobile Care, built for luxury and performance. Experience the peak of modern technology seamlessly integrated with elegant design."}
            </p>
          </div>

          {/* Guarantees */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-8 w-8 text-gold-500 mb-3" />
              <h4 className="text-white font-medium text-sm mb-1">Authentic Quality</h4>
              <p className="text-xs text-zinc-500">100% genuine products</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck className="h-8 w-8 text-gold-500 mb-3" />
              <h4 className="text-white font-medium text-sm mb-1">Fast Delivery</h4>
              <p className="text-xs text-zinc-500">Nationwide shipping</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-8 w-8 text-gold-500 mb-3" />
              <h4 className="text-white font-medium text-sm mb-1">Warranty</h4>
              <p className="text-xs text-zinc-500">Official brand warranty</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-900 rounded-full p-2"
            >
               <span className="sr-only">Close</span>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-8 pb-4 flex flex-col items-center border-b border-white/5">
              <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              
              {isCopied && (
                 <div className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 flex items-center">
                    <span className="mr-2 h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Auto Copied Successfully
                 </div>
              )}

              <h2 className="text-2xl font-display font-bold text-white text-center mb-2">
                অর্ডারটি অটোমেটিক কপি হয়ে গেছে!
              </h2>
              <p className="text-zinc-400 text-sm text-center max-w-md leading-relaxed">
                আমরা আপনার নাম, ফোন, ঠিকানা ও প্রোডাক্টির বিস্তারিত এক ক্লিকেই <strong>**অটো কপি**</strong> করে দিয়েছি। এখন শুধু নিচে মেসেঞ্জার ওপেন করে <strong>**Paste (পেস্ট)**</strong> করে পাঠিয়ে দিন!
              </p>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
               <div className="bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900">
                     <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">Invoice Message Text</span>
                     <button
                        onClick={handleManualCopy}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-xs text-white"
                     >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                     </button>
                  </div>
                  <pre className="p-6 text-sm text-zinc-300 whitespace-pre-wrap font-mono uppercase leading-relaxed text-[11px] md:text-sm">
                    {invoiceText}
                  </pre>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-white/5 rounded-xl bg-zinc-900/30 flex items-start space-x-4">
                     <div className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-xs flex-shrink-0">1</div>
                     <div>
                        <h4 className="text-white text-sm font-bold mb-1">অর্ডার কপি করুন</h4>
                        <p className="text-zinc-500 text-xs">মেসেজ বক্সে সব তথ্য রেডি আছে। কপিকৃত না থাকলে উপরের Copy বাটনে চাপুন।</p>
                     </div>
                  </div>
                  <div className="p-4 border border-white/5 rounded-xl bg-zinc-900/30 flex items-start space-x-4">
                     <div className="h-6 w-6 rounded-full bg-gold-500 flex items-center justify-center text-zinc-900 font-bold text-xs flex-shrink-0">2</div>
                     <div>
                        <h4 className="text-white text-sm font-bold mb-1">মেসেঞ্জারে পেস্ট করুন</h4>
                        <p className="text-zinc-500 text-xs">নিচের নীল বাটনে চাপ দিয়ে চ্যাট ওপেন করে শুধুমাত্র পেস্ট (Paste / Long Press) করে পাঠিয়ে দিন!</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-white/5 flex gap-4 w-full flex-col md:flex-row">
               <a 
                 href="https://m.me/limon.islam.936946" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex-grow py-4 rounded-xl font-bold flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:-translate-y-1 text-sm md:text-base text-center"
               >
                 <MessageCircle className="h-5 w-5" />
                 <span>মেসেঞ্জার ওপেন করে পেস্ট করুন (PASTE THERE)</span>
               </a>
               <button 
                 onClick={() => setShowModal(false)}
                 className="py-4 px-8 rounded-xl font-bold flex items-center justify-center border border-white/10 hover:bg-white/5 text-white transition-all text-sm uppercase tracking-widest"
               >
                 Edit Info
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
