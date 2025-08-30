// BUAT FILE BARU ATAU GANTI ISI: resources/js/Pages/Rentals/Show.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, Check, X, Undo2 } from 'lucide-react';

export default function Show({ auth, rental }) {
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const formatDate = (date) => new Date(date).toLocaleString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    const handleUpdateStatus = (status) => {
        if (confirm(`Are you sure you want to ${status} this rental?`)) {
            router.patch(route('rentals.update', rental.id), { status });
        }
    };
    
    const isOwner = auth.user.id === rental.owner_id;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Rental ${rental.rental_number || `RNT-${rental.id}`}`} />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Link href={route('rentals.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-6">
                        <ChevronLeft size={18} /> Back to Rental History
                    </Link>

                    <div className="bg-card border border-border rounded-lg shadow-sm">
                        {/* Header */}
                        <div className="p-6 border-b border-border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-serif font-bold text-foreground">Rental Details</h1>
                                    <p className="text-muted-foreground text-sm mt-1">Order #{rental.rental_number || `RNT-${rental.id}`}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${rental.status === 'returned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {rental.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><p className="text-muted-foreground">Item</p><p className="font-medium text-foreground">{rental.item.name}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Rental Period</p><p className="font-medium text-foreground">{formatDate(rental.start_date)} to {formatDate(rental.end_date)}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Daily Rate</p><p className="font-medium text-foreground">{formatPrice(rental.daily_rate)}</p></div>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><p className="text-muted-foreground">Owner</p><p className="font-medium text-foreground">{rental.owner.name}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Renter</p><p className="font-medium text-foreground">{rental.renter.name}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Security Deposit</p><p className="font-medium text-foreground">{formatPrice(rental.deposit_amount)}</p></div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="p-6 bg-secondary/50 border-t border-border flex justify-between items-center">
                            <h3 className="text-lg font-bold text-foreground">Total Amount</h3>
                            <p className="text-xl font-bold text-foreground">{formatPrice(rental.total_amount)}</p>
                        </div>

                        {/* Actions for Owner */}
                        {isOwner && rental.status === 'pending' && (
                            <div className="p-6 border-t border-border flex flex-col sm:flex-row gap-4">
                                <h3 className="font-semibold text-foreground flex-shrink-0 mt-2">Action Required:</h3>
                                <div className="flex-grow flex gap-4">
                                    <button onClick={() => handleUpdateStatus('confirmed')} className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700">
                                        <Check size={16} /> Confirm Booking
                                    </button>
                                    <button onClick={() => handleUpdateStatus('cancelled')} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700">
                                        <X size={16} /> Decline Booking
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Actions for Owner during rental */}
                        {isOwner && rental.status === 'ongoing' && (
                             <div className="p-6 border-t border-border">
                                <h3 className="font-semibold text-foreground mb-2">Item Returned?</h3>
                                <p className="text-sm text-muted-foreground mb-4">Once the renter has returned the item, you can mark this rental as complete.</p>
                                <Link href={route('rentals.complete-return', rental.id)} method="post" as="button" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90">
                                    <Undo2 size={16} /> Mark as Returned
                                </Link>
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}