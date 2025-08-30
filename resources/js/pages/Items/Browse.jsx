// GANTI SELURUH ISI FILE: resources/js/Pages/Browse/Index.jsx

import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout'; // <-- PERBAIKAN: Gunakan GuestLayout
import { Search, SlidersHorizontal, Tags, Ruler } from 'lucide-react';
import { useEffect, useRef } from 'react';

// --- Komponen ProductCard (Logika harga sudah benar) ---
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
        <div className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <Link href={itemUrl}>
                <div className="aspect-[3/4] w-full bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                        src={item.main_image_url || `https://picsum.photos/seed/${item.slug}/400/500`}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>
            <div className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category?.name || 'Kategori'}</p>
                <h3 className="mt-1 font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
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

// --- Komponen Utama Browse ---
export default function Browse({ auth, items, categories = [], filters = {} }) {
    const { data, setData, get } = useForm({
        search: filters.search ?? '',
        category: filters.category ?? '',
        sort: filters.sort ?? 'newest',
        condition: filters.condition ?? '',
    });

    const isInitialMount = useRef(true);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        get('/browse', { preserveState: true, preserveScroll: true });
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        get('/browse', { preserveState: true, preserveScroll: true, replace: true });
    }, [data.category, data.sort, data.condition]);


    return (
        <GuestLayout auth={auth}> {/* <-- PERBAIKAN: Gunakan GuestLayout */}
            <Head title="Jelajahi Produk" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif font-bold text-foreground">Jelajahi Berbagai Produk</h1>
                    <p className="mt-2 text-muted-foreground">Temukan kebutuhan Anda untuk riset, proyek, dan lainnya.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {/* --- Sidebar Filter --- */}
                    <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-sm border border-border sticky top-28 h-fit">
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                            <SlidersHorizontal size={24} className="text-primary"/> Filters
                        </h2>
                        <form onSubmit={handleFilterSubmit} className="space-y-6">
                            {/* Form Fields */}
                            <div>
                                <label htmlFor="search" className="block text-sm font-semibold text-foreground mb-2">Cari Item</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                    <input id="search" type="text" value={data.search} onChange={(e) => setData('search', e.target.value)} placeholder="Nama produk..." className="w-full block pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:ring-1 focus:ring-ring focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><Tags size={16} />Kategori</label>
                                <select id="category" value={data.category} onChange={(e) => setData('category', e.target.value)} className="w-full block pl-3 pr-8 py-2 bg-background border border-border rounded-md focus:ring-1 focus:ring-ring focus:outline-none">
                                    <option value="">Semua Kategori</option>
                                    {categories.map(category => (<option key={category.id} value={category.slug}>{category.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="condition" className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><Ruler size={16} />Kondisi</label>
                                <select id="condition" value={data.condition} onChange={(e) => setData('condition', e.target.value)} className="w-full block pl-3 pr-8 py-2 bg-background border border-border rounded-md focus:ring-1 focus:ring-ring focus:outline-none">
                                    <option value="">Semua Kondisi</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="like_new">Like New</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors">Cari</button>
                        </form>
                    </aside>

                    {/* --- Main Content (Product Grid & Sort) --- */}
                    <main className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-muted-foreground">Showing {items.from}-{items.to} of {items.total} results</p>
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="text-sm font-semibold text-foreground">Urutkan:</label>
                                <select id="sort" value={data.sort} onChange={(e) => setData('sort', e.target.value)} className="block pl-3 pr-8 py-2 bg-card border border-border rounded-md text-sm focus:ring-1 focus:ring-ring focus:outline-none">
                                    <option value="newest">Terbaru</option>
                                    <option value="price_asc">Harga Terendah</option>
                                    <option value="price_desc">Harga Tertinggi</option>
                                </select>
                            </div>
                        </div>
                        {items.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {items.data.map(item => (<ProductCard key={item.id} item={item} />))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-card rounded-lg border border-border shadow-sm">
                                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Produk Tidak Ditemukan</h3>
                                <p className="text-muted-foreground">Coba sesuaikan filter Anda atau cari kata kunci lain.</p>
                            </div>
                        )}
                        {items.links && items.links.length > 3 && (
                            <nav className="mt-12 flex justify-center" aria-label="Pagination">
                                <div className="flex items-center space-x-1">
                                    {items.links.map((link, index) => (<Link key={index} href={link.url || '#'} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${link.active ? 'bg-primary text-primary-foreground' : link.url ? 'bg-card text-foreground hover:bg-secondary' : 'bg-card text-muted-foreground cursor-not-allowed'}`} dangerouslySetInnerHTML={{ __html: link.label }}/>))}
                                </div>
                            </nav>
                        )}
                    </main>
                </div>
            </div>
        </GuestLayout>
    );
}