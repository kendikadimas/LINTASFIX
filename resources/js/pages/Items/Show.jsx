// GANTI SELURUH ISI FILE: resources/js/Pages/Items/Show.jsx

import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ShoppingBag, Star, ShieldCheck, Truck, MessageSquare } from 'lucide-react';

// --- Komponen ProductCard (tetap sama) ---
const ProductCard = ({ item }) => {
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const itemUrl = `/items/${item.slug || item.id}`;
    
    let displayPrice;
    let priceLabel = '';
    if (item.availability_type === 'rent' && (!item.price || parseFloat(item.price) === 0)) {
        displayPrice = item.rental_price_per_day;
        priceLabel = '/ hari';
    } else {
        displayPrice = item.price;
    }

    return (
        <div className="group">
            <Link href={itemUrl}>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary">
                    <img
                        src={item.main_image_url || `https://picsum.photos/seed/${item.slug}/400/500`}
                        alt={item.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">{item.category?.name || 'Category'}</p>
                <h3 className="mt-1 font-semibold text-foreground text-base">
                    <Link href={itemUrl}>{item.name}</Link>
                </h3>
                <div className="mt-2 flex items-baseline">
                    <p className="font-bold text-primary text-xl">{formatPrice(displayPrice)}</p>
                    {priceLabel && (<span className="text-sm font-medium text-muted-foreground ml-1">{priceLabel}</span>)}
                </div>
            </div>
        </div>
    );
};

// --- Komponen Utama Halaman Show ---
export default function Show({ auth, item, relatedItems = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [rentalDays, setRentalDays] = useState(1);

    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    
    // PERBAIKAN: Membuat array URL lengkap dari semua gambar yang diupload
    const imageUrls = item.images ? item.images.map(path => `/storage/${path}`) : [];
    // Jika tidak ada gambar yang diupload, gunakan gambar utama dari seeder (jika ada)
    const displayImages = imageUrls.length > 0 ? imageUrls : (item.main_image_url ? [item.main_image_url] : []);

    const handleCheckout = (type) => {
        if (!auth.user) {
            router.get('/login');
            return;
        }
        const checkoutData = { item_id: item.id, type: type };
        if (type === 'rental') {
            checkoutData.days = rentalDays;
        }
        router.get('/checkout', checkoutData);
    };

    let mainPrice;
    let priceLabel = '';

    if (item.availability_type === 'rent') {
        mainPrice = item.rental_price_per_day;
        priceLabel = '/ hari';
    } else {
        mainPrice = item.price;
    }

    return (
        <section>
            <Head title={item.name} />
            <div className="bg-background font-sans">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-sm text-muted-foreground mb-8">
                        <Link href="/browse" className="hover:text-primary">Shop</Link> / <span className="text-foreground">{item.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* --- Image Gallery (Kiri) --- */}
                        <div className="space-y-4">
                             <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary">
                                <img 
                                    // PERBAIKAN: Logika fallback untuk gambar utama
                                    src={displayImages[selectedImage] || `https://picsum.photos/seed/${item.slug}/800/800`}
                                    alt={`${item.name} image ${selectedImage + 1}`} 
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            {displayImages.length > 1 && (
                                <div className="grid grid-cols-5 gap-4">
                                    {displayImages.map((imgUrl, index) => (
                                        <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square w-full rounded-md overflow-hidden bg-secondary ring-2 ring-offset-2 ring-offset-background transition-all ${selectedImage === index ? 'ring-primary' : 'ring-transparent'}`}>
                                            <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover object-center"/>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* --- Detail (Kanan) --- */}
                        <div>
                            <p className="font-semibold text-primary">{item.category?.name || 'Category'}</p>
                            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-foreground font-serif leading-tight">{item.name}</h1>
                            
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex items-center">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />))}</div>
                                <span className="text-sm text-muted-foreground">(12 Reviews)</span>
                            </div>
                            
                            <div className="mt-6">
                                <p className="text-3xl font-bold text-foreground">
                                    {formatPrice(mainPrice)}
                                    {priceLabel && <span className="text-xl font-medium text-muted-foreground ml-2">{priceLabel}</span>}
                                </p>
                            </div>
                                                        
                            <div className="mt-6 prose prose-p:text-muted-foreground max-w-none"><p>{item.description}</p></div>
                            
                            <div className="mt-8 space-y-4">
                                {['sale', 'both'].includes(item.availability_type) && (
                                    <button onClick={() => handleCheckout('purchase')} className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-base hover:bg-primary/90 transition-colors">
                                        Buy Now {item.availability_type === 'both' && `(${formatPrice(item.price)})`}
                                    </button>
                                )}
                                {['rent', 'both'].includes(item.availability_type) && (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <label htmlFor="rental_days" className="block text-sm font-semibold text-foreground mb-2">Durasi Sewa (hari)</label>
                                                <input type="number" id="rental_days" value={rentalDays} onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))} min="1" max="30" className="w-full p-2 bg-background border border-border rounded-md"/>
                                            </div>
                                            <div className="flex-1 mt-auto">
                                                 <button onClick={() => handleCheckout('rental')} className="w-full bg-card border-2 border-primary text-primary py-3 rounded-md font-semibold text-base hover:bg-primary/5 transition-colors">Rent Now</button>
                                            </div>
                                        </div>
                                        <p className="text-center font-bold text-lg">Total Sewa: {formatPrice(item.rental_price_per_day * rentalDays)}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-8 border-t border-border pt-6 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground"><ShieldCheck className="h-5 w-5 text-primary"/><span>Original Product Guarantee</span></div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Truck className="h-5 w-5 text-primary"/><span>Campus-wide Delivery Options</span></div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground"><MessageSquare className="h-5 w-5 text-primary"/><span>Direct Contact with Seller</span></div>
                            </div>

                            <div className="mt-8 border-t border-border pt-6"><h3 className="font-semibold text-foreground">Specifications</h3><div className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><p className="text-muted-foreground">Condition</p><p className="font-medium text-foreground capitalize">{item.condition}</p></div><div><p className="text-muted-foreground">Brand</p><p className="font-medium text-foreground">{item.brand || 'N/A'}</p></div><div><p className="text-muted-foreground">Posted</p><p className="font-medium text-foreground">{formatDate(item.created_at)}</p></div><div><p className="text-muted-foreground">Location</p><p className="font-medium text-foreground">{item.location || 'N/A'}</p></div></div></div>
                            <div className="mt-6 border-t border-border pt-6"><h3 className="font-semibold text-foreground">Seller Information</h3><div className="mt-4 flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-primary text-lg">{item.user.name.charAt(0)}</div><div><p className="font-semibold text-foreground">{item.user.name}</p><p className="text-sm text-muted-foreground">Member since {new Date(item.user.created_at).getFullYear()}</p></div></div></div>
                        </div>
                    </div>
                    
                    {/* Related Items */}
                    {relatedItems.length > 0 && (
                        <section className="mt-24 pt-16 border-t border-border">
                            <h2 className="text-3xl font-bold text-foreground font-serif text-center">You Might Also Like</h2>
                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                                {relatedItems.map(relatedItem => <ProductCard key={relatedItem.id} item={relatedItem} />)}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </section>
    );
}