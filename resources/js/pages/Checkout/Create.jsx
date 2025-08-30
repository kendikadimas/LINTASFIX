// GANTI SELURUH ISI FILE: resources/js/Pages/Checkout/Create.jsx DENGAN INI

import { Head, Link, useForm } from '@inertiajs/react';
import { ShoppingBag, ChevronLeft, Lock } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Create({ auth, item, checkoutData }) {
    const { data, setData, post, processing, errors } = useForm({
        item_id: item.id,
        type: checkoutData.type,
        days: checkoutData.days,
        payment_method: 'bank_transfer',
        delivery_method: 'pickup',
        delivery_address: '',
        notes: '',
    });

    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    const submit = (e) => {
        e.preventDefault();
        post('/checkout/process', {
            onSuccess: () => {
                // Flash message dan redirect otomatis
            },
            onError: () => {
                // Error validasi akan muncul di form
            },
        });
    };

    return (
        <section>
            <Head title="Checkout" />
            
            <div className="font-sans bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Simplified Header for Checkout */}
                    <header className="flex justify-between items-center h-24 border-b border-border">
                        <Link href={`/items/${item.slug || item.id}`} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
                            <ChevronLeft size={18} />
                            Back to Item
                        </Link>
                        <Link href="/" className="flex items-center gap-2">
                            <ShoppingBag className="h-7 w-7 text-primary" />
                            <span className="text-2xl font-bold text-foreground tracking-tighter">LINTAS</span>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lock size={16} />
                            <span>Secure Checkout</span>
                        </div>
                    </header>

                    <main className="py-12">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-serif font-bold text-foreground">Confirm Your Order</h1>
                            <p className="mt-2 text-muted-foreground">Please review your order details before placing it.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                            {/* --- Left Column: Form --- */}
                            <div className="lg:col-span-7">
                                {Object.keys(errors).length > 0 && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                                        <strong className="font-bold">Oops! Something went wrong.</strong>
                                        <ul className="mt-2 list-disc list-inside">
                                            {Object.values(errors).map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <form onSubmit={submit} className="space-y-10">
                                    {/* Delivery Method */}
                                    <section>
                                        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Delivery Method</h2>
                                        <div className="space-y-4">
                                            <div onClick={() => setData('delivery_method', 'pickup')} className={`p-4 border rounded-lg cursor-pointer transition-all ${data.delivery_method === 'pickup' ? 'bg-secondary border-primary ring-2 ring-primary' : 'border-border'}`}>
                                                <p className="font-semibold text-foreground">In-Person Pickup</p>
                                                <p className="text-sm text-muted-foreground">Meet with the seller to pick up the item. Free of charge.</p>
                                            </div>
                                            <div onClick={() => setData('delivery_method', 'delivery')} className={`p-4 border rounded-lg cursor-pointer transition-all ${data.delivery_method === 'delivery' ? 'bg-secondary border-primary ring-2 ring-primary' : 'border-border'}`}>
                                                <p className="font-semibold text-foreground">Delivery</p>
                                                <p className="text-sm text-muted-foreground">Get the item delivered to your address (coordinate with seller).</p>
                                            </div>
                                        </div>
                                        {data.delivery_method === 'delivery' && (
                                            <div className="mt-4"><textarea value={data.delivery_address} onChange={e => setData('delivery_address', e.target.value)} placeholder="Enter your full delivery address" rows="3" className="w-full p-2 bg-background border border-border rounded-md" required></textarea>{errors.delivery_address && <p className="text-sm text-red-600 mt-1">{errors.delivery_address}</p>}</div>
                                        )}
                                    </section>

                                    {/* Payment Method */}
                                    <section>
                                        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">2. Payment Method</h2>
                                        <div className="p-4 border rounded-lg bg-secondary">
                                            <p className="font-semibold text-foreground">Bank Transfer / E-Wallet</p>
                                            <p className="text-sm text-muted-foreground">You will receive payment details from the seller after placing the order.</p>
                                        </div>
                                    </section>
                                    
                                    {/* Notes */}
                                    <section>
                                        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">3. Additional Notes (Optional)</h2>
                                        <textarea value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Any specific requests for the seller?" rows="4" className="w-full p-2 bg-background border border-border rounded-md"></textarea>
                                    </section>

                                    <button type="submit" disabled={processing} className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-semibold text-base hover:bg-primary/90 disabled:opacity-50 transition-colors">
                                        {processing ? 'Processing...' : `Place Order (${formatPrice(checkoutData.total_price)})`}
                                    </button>
                                </form>
                            </div>

                            {/* --- Right Column: Order Summary --- */}
                            <div className="lg:col-span-5 lg:sticky top-8">
                                <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-serif font-bold text-foreground border-b border-border pb-4 mb-4">Order Summary</h2>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-md bg-secondary flex-shrink-0"><img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover rounded-md"/></div>
                                        <div><p className="font-semibold text-foreground">{item.name}</p><p className="text-sm text-muted-foreground capitalize">{item.condition} Condition</p></div>
                                    </div>
                                    <div className="mt-6 space-y-3 text-sm border-t border-border pt-4">
                                        {checkoutData.type === 'rental' ? (
                                            <>
                                                <div className="flex justify-between"><p className="text-muted-foreground">Rental Cost ({checkoutData.days} days)</p><p className="font-medium text-foreground">{formatPrice(checkoutData.rental_cost)}</p></div>
                                                <div className="flex justify-between"><p className="text-muted-foreground">Security Deposit</p><p className="font-medium text-foreground">{formatPrice(checkoutData.deposit)}</p></div>
                                            </>
                                        ) : (
                                            <div className="flex justify-between"><p className="text-muted-foreground">Subtotal</p><p className="font-medium text-foreground">{formatPrice(checkoutData.total_price)}</p></div>
                                        )}
                                        {/* <div className="flex justify-between">
                                            <p className="text-muted-foreground">Admin Fee (5%)</p>
                                            <p className="font-medium text-foreground">{formatPrice(checkoutData.admin_fee)}</p>
                                        </div> */}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center border-t border-border pt-4">
                                        <p className="text-lg font-bold text-foreground">Total</p>
                                        <p className="text-xl font-bold text-foreground">{formatPrice(checkoutData.total_price)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}