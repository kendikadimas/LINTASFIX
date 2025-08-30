// GANTI SELURUH ISI FILE: resources/js/Pages/Checkout/Success.jsx DENGAN INI

import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, CheckCircle2, FileText, Banknote, Clock } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Success({ auth, transaction, rental, type }) {
    const order = type === 'purchase' ? transaction : rental;
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    return (
        <section>
            <Head title="Order Successful" />

            <div className="bg-background font-sans">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                    <h1 className="mt-4 text-5xl font-serif font-bold text-foreground">
                        {type === 'purchase' ? 'Order Placed!' : 'Booking Confirmed!'}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Thank you! Your order has been successfully placed and is now pending payment.
                    </p>

                    {/* --- Order Summary Card --- */}
                    <div className="mt-8 bg-card border border-border rounded-lg shadow-sm text-left p-6">
                        <h2 className="text-lg font-semibold text-foreground">Order #{order.transaction_number || order.rental_number}</h2>
                        <div className="mt-4 border-t border-border pt-4">
                            <dl className="space-y-4 text-sm">
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-muted-foreground">Item</dt>
                                    <dd className="col-span-2 font-medium text-foreground">{order.item.name}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-muted-foreground">Total Amount</dt>
                                    <dd className="col-span-2 font-medium text-foreground">{formatPrice(order.amount || order.total_amount)}</dd>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <dt className="text-muted-foreground">Seller</dt>
                                    <dd className="col-span-2 font-medium text-foreground">{order.seller?.name || order.owner?.name}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* --- What's Next Section --- */}
                    <div className="mt-8 text-left">
                        <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-6">What Happens Next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-secondary p-4 rounded-lg">
                                <div className="flex items-center gap-3"><FileText className="h-6 w-6 text-primary" /><h3 className="font-semibold text-foreground">1. Check Your Details</h3></div>
                                <p className="mt-2 text-sm text-muted-foreground">You can view the full order details in your dashboard under "Transactions" or "Rentals".</p>
                            </div>
                            <div className="bg-secondary p-4 rounded-lg">
                                <div className="flex items-center gap-3"><Banknote className="h-6 w-6 text-primary" /><h3 className="font-semibold text-foreground">2. Make Payment</h3></div>
                                <p className="mt-2 text-sm text-muted-foreground">Contact the seller to arrange payment. Upload the proof in your transaction details page.</p>
                            </div>
                             <div className="bg-secondary p-4 rounded-lg">
                                <div className="flex items-center gap-3"><Clock className="h-6 w-6 text-primary" /><h3 className="font-semibold text-foreground">3. Arrange Delivery</h3></div>
                                <p className="mt-2 text-sm text-muted-foreground">Coordinate with the seller for item pickup or delivery as per your selected method.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/browse" className="w-full sm:w-auto border border-border bg-card text-foreground px-6 py-3 rounded-md font-semibold hover:bg-secondary">
                            Continue Shopping
                        </Link>
                        <Link href="/dashboard" className="w-full sm:w-auto bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}