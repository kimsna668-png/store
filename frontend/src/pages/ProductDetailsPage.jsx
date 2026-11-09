import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Zap, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Download, 
  Clock, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  Share2, 
  Heart,
  MessageSquare,
  HelpCircle,
  FileCode,
  Laptop
} from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, formatPrice } = useCart();

  // Find product by slug or default to digital-product-2
  const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review form state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Sokha Chan',
      rating: 5,
      date: '2 days ago',
      title: 'Works amazingly well for my TikTok videos!',
      comment: 'Very fast automatic subtitle and voice generation. I bought using Bakong KHQR and got the download and license key within 5 seconds! Highly recommended for all creators in Cambodia.',
      verified: true
    },
    {
      id: 2,
      author: 'Vireak Rith',
      rating: 5,
      date: '1 week ago',
      title: 'Best AI video tool for Khmer creators',
      comment: 'The interface is clean and supports Khmer fonts properly without breaking. Great support from @navaseal on Telegram when I needed setup assistance.',
      verified: true
    },
    {
      id: 3,
      author: 'Michael T.',
      rating: 4,
      date: '2 weeks ago',
      title: 'Solid automation workflow',
      comment: 'Saved me tons of hours assembling B-rolls and syncing captions. Excellent value for money compared to expensive monthly subscriptions.',
      verified: true
    }
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedVariant(product.variants?.[0] || null);
    setActiveImageIndex(0);
  }, [slug, product]);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = selectedVariant ? (selectedVariant.comparePrice || product.comparePrice) : product.comparePrice;
  const discountPercent = originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const galleryImages = product.gallery || [product.imageUrl];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: 'Great product purchase',
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium flex-wrap">
          <Link to="/" className="hover:text-teal-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-teal-600 transition">Digital Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-semibold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Featured Image Container */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 group">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Instant Delivery Floating Ribbon */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500 text-slate-950 shadow-md">
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Instant Digital Delivery</span>
                  </span>
                  {discountPercent && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase bg-rose-600 text-white shadow-md w-fit">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                <button 
                  onClick={handleShare}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur transition"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {copiedLink && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-lg">
                    Link copied to clipboard!
                  </div>
                )}
              </div>

              {/* Thumbnails Carousel */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                        activeImageIndex === idx 
                          ? 'border-teal-500 ring-2 ring-teal-500/20' 
                          : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Delivery</span>
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Zap className="w-3 h-3 text-teal-600" />
                    Auto Instant (24/7)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Version</span>
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <FileCode className="w-3 h-3 text-indigo-600" />
                    v2.5.0 Pro (Latest)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Platform</span>
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Laptop className="w-3 h-3 text-emerald-600" />
                    Windows & Mac
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Product Purchase Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
                    {product.category?.name || 'AI Automated Tools'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    In Stock • Auto Delivered
                  </span>
                </div>

                {/* English Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.title}
                </h1>

                {/* Khmer Title */}
                {product.titleKhmer && (
                  <p className="mt-2 text-base text-teal-700 font-semibold khmer-font leading-relaxed">
                    {product.titleKhmer}
                  </p>
                )}

                {/* Rating & Sales */}
                <div className="flex items-center gap-4 mt-3 pb-4 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <a href="#reviews" onClick={() => setActiveTab('reviews')} className="text-teal-600 hover:underline font-semibold">
                    {product.reviewsCount || reviews.length} Customer Reviews
                  </a>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 font-medium">{product.salesCount || 342} orders completed</span>
                </div>

                {/* Pricing Display */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-teal-50/60 via-emerald-50/40 to-slate-50 border border-teal-100/80">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {formatPrice(currentPrice)}
                    </span>
                    {originalPrice && (
                      <span className="text-base text-slate-400 line-through font-semibold">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                    {discountPercent && (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-extrabold text-xs uppercase shadow-xs">
                        -{discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    ⚡ Instant license key and download link provided immediately upon payment.
                  </p>
                </div>

                {/* License Variants Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-2.5 mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Select License Plan:
                    </label>
                    <div className="space-y-2">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition ${
                              isSelected
                                ? 'border-teal-500 bg-teal-50/40 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                              </div>
                              <span className={`text-xs font-bold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                                {v.title}
                              </span>
                            </div>
                            <span className="text-sm font-black text-slate-900">
                              {formatPrice(v.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    
                    {/* Quantity Counter */}
                    <div className="flex items-center border-2 border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 rounded-lg bg-white shadow-xs text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 rounded-lg bg-white shadow-xs text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Add To Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition group"
                    >
                      <ShoppingBag className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span>Add to Cart</span>
                    </button>

                  </div>

                  {/* Primary Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-black text-base shadow-lg shadow-teal-500/30 transition transform hover:-translate-y-0.5"
                  >
                    <Zap className="w-5 h-5 fill-white" />
                    <span>Buy Now & Instant Download</span>
                  </button>

                  {/* Buy via Telegram Direct Button */}
                  <a
                    href="https://t.me/navaseal"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold text-xs transition"
                  >
                    <Send className="w-4 h-4 text-sky-500" />
                    <span>Or Order Directly via Telegram @navaseal</span>
                  </a>
                </div>

                {/* Added To Cart Notification Toast */}
                {addedToast && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center gap-2 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to cart successfully!</span>
                    </div>
                    <Link to="/cart" className="underline font-bold text-emerald-900">
                      View Cart
                    </Link>
                  </div>
                )}

              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>100% Genuine & Tested:</strong> Direct clean release with full warranty</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span><strong>Automatic Delivery:</strong> File & Key available within 5 seconds of payment</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span><strong>Payment Methods:</strong> Bakong KHQR, ABA, Wing, Stripe, Visa & Mastercard</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Tabs: Description, Delivery Info, Reviews */}
        <div id="reviews" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-16">
          
          {/* Tab Navigation Header */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 text-sm font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'description'
                  ? 'border-teal-600 text-teal-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Description & Features
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`py-4 px-6 text-sm font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'delivery'
                  ? 'border-teal-600 text-teal-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Instant Delivery & Instructions
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'border-teal-600 text-teal-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Customer Reviews</span>
              <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold">
                {reviews.length}
              </span>
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="p-6 sm:p-10 space-y-6">
              
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 text-teal-900">
                  <h4 className="font-extrabold text-base mb-1 khmer-font">
                    {product.titleKhmer}
                  </h4>
                  <p className="khmer-font text-xs leading-relaxed text-teal-800">
                    {product.shortDescriptionKhmer || product.shortDescription}
                  </p>
                </div>

                <div className="whitespace-pre-line font-normal text-slate-700">
                  {product.description}
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 pt-4 border-t border-slate-100">
                  ⚡ Included Key Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {(product.features || [
                    'Immediate download link after scan KHQR',
                    'Permanent single or multi-device activation',
                    'Free updates and bug fix patches',
                    'Complete video documentation in Khmer & English'
                  ]).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">{feat}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 pt-4 border-t border-slate-100">
                  💻 System Requirements
                </h3>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5">
                  <li><strong>Operating System:</strong> Windows 10/11 (64-bit) or macOS 12 Monterey and above</li>
                  <li><strong>RAM:</strong> 4GB minimum (8GB recommended for HD batch rendering)</li>
                  <li><strong>Disk Space:</strong> 500MB free storage space for installation</li>
                  <li><strong>Internet:</strong> Standard connection required for one-time activation</li>
                </ul>

              </div>

            </div>
          )}

          {/* Tab 2: Delivery & Download Instructions */}
          {activeTab === 'delivery' && (
            <div className="p-6 sm:p-10 space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900">
                How Automatic Digital Delivery Works
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-base">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Select & Checkout</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Choose your license variant, click <strong>Buy Now</strong>, and enter your contact details and optional Telegram handle.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-base">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Scan Bakong KHQR / Stripe</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scan the dynamic Bakong KHQR code with any Cambodian mobile bank app (ABA, Wing, ACLEDA) or pay via international card.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Instant Access & Download</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Within 5 seconds, the page automatically unlocks your signed download link and displays your activation license key.
                  </p>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Need manual assistance?</span>
                  <p className="mt-0.5">
                    If you prefer paying via direct bank transfer or want direct Telegram delivery, message us directly at{' '}
                    <a href="https://t.me/navaseal" target="_blank" rel="noreferrer" className="underline font-bold text-amber-950">
                      @navaseal
                    </a>. We are online 24/7.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Reviews Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-black text-slate-900">{product.rating}</div>
                  <div className="flex items-center gap-1 justify-center sm:justify-start text-amber-400 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Based on {reviews.length} verified ratings</p>
                </div>

                <div className="flex-1 w-full border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-600 font-semibold">5 Stars</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[90%]"></div>
                    </div>
                    <span className="w-8 text-right font-semibold">90%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-600 font-semibold">4 Stars</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[10%]"></div>
                    </div>
                    <span className="w-8 text-right font-semibold">10%</span>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Write a Review</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Visal Sok"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 bg-white"
                    >
                      <option value="5">★★★★★ (5 Stars - Excellent)</option>
                      <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                      <option value="3">★★★☆☆ (3 Stars - Average)</option>
                      <option value="2">★★☆☆☆ (2 Stars - Poor)</option>
                      <option value="1">★☆☆☆☆ (1 Star - Terrible)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Share your experience with this digital tool..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition"
                >
                  Submit Review
                </button>
              </form>

              {/* Review Items List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Related Products Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">You May Also Need</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Related Digital Products
              </h3>
            </div>
            <Link to="/products" className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

