// GANTI SELURUH ISI FILE: resources/js/Pages/LandingPage.jsx

import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout'; // Menggunakan GuestLayout agar konsisten

export default function LandingPage({ auth, featuredItems = [], categories = [] }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    // --- ProductCard dengan Logika Harga yang Sudah Diperbaiki ---
    const ProductCard = ({ item }) => {
        const itemUrl = `/items/${item.slug || item.id}`;
        
        let displayPrice;
        let priceLabel = '';
        let originalPrice = null;

        // Logika untuk menentukan harga yang ditampilkan
        if (item.availability_type === 'rent' && (!item.price || parseFloat(item.price) === 0)) {
            displayPrice = item.rental_price_per_day;
            priceLabel = '/ hari';
        } else {
            displayPrice = item.price;
            // Terapkan diskon 10% untuk item yang dijual di landing page
            originalPrice = displayPrice;
            displayPrice = originalPrice * 0.9;
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
                    <h3 className="mt-1 font-semibold text-foreground text-lg">
                        <Link href={itemUrl}>{item.name}</Link>
                    </h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="font-bold text-primary text-lg">{formatPrice(displayPrice)}</p>
                        {priceLabel && <span className="text-sm font-medium text-muted-foreground ml-1">{priceLabel}</span>}
                        {originalPrice && <p className="text-sm text-muted-foreground line-through ml-2">{formatPrice(originalPrice)}</p>}
                    </div>
                    <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground">4.9 Rating</span>
                    </div>
                </div>
            </div>
        );
    };
    
    // --- CategoryCard dengan Gambar Dinamis ---
    const CategoryCard = ({ category }) => (
        <Link href={`/browse?category=${category.slug}`} className="group flex flex-col items-start p-4 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <p className="text-sm">{category.items_count} items</p>
        </Link>
    );

    return (
        <GuestLayout auth={auth}>
            <Head title="LintasInn - Premium Academic Marketplace" />
            
            <main>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <p className="text-primary font-semibold">To Inspire a Refined Lifestyle</p>
                            <h1 className="mt-4 text-5xl sm:text-7xl font-extrabold text-foreground font-serif leading-tight">
                                Brand New Collection
                            </h1>
                            <p className="mt-6 max-w-md mx-auto md:mx-0 text-muted-foreground">
                                The essential marketplace for students seeking quality, durability, and style in their academic and everyday tools.
                            </p>
                            <Link href="/browse" className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                                Shop Now <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary">
                            <img 
                                src="images/hero2.png" 
                                alt="Refined academic lifestyle"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30 pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.slice(0, 4).map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-left mb-12">
                        <p className="text-sm font-semibold text-primary">Exclusive Items</p>
                        <h2 className="mt-2 text-4xl font-bold text-foreground font-serif">Featured Products</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {featuredItems.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            </main>
        </GuestLayout>
    );
}