// BUAT FILE BARU: resources/js/Pages/Transactions/Show.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Upload } from 'lucide-react';

export default function Show({ auth, transaction }) {
    const { setData, post, processing, errors } = useForm({ payment_proof: null });

    const handleProofUpload = (e) => {
        e.preventDefault();
        const url = `/transactions/${transaction.id}/upload-proof`;
        post(url, {
            forceFormData: true,
            // Menambahkan ini akan membuat halaman refresh dengan data baru setelah sukses
            preserveScroll: true, 
            onSuccess: () => {
                // Optional: reset file input
            },
        });
    };

    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const formatDate = (date) => new Date(date).toLocaleString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Transaction ${transaction.transaction_number}`} />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Link href={route('transactions.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-6"><ChevronLeft size={18} /> Back to History</Link>
                    <div className="bg-card border border-border rounded-lg shadow-sm">
                        <div className="p-6 border-b border-border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-serif font-bold text-foreground">Transaction Details</h1>
                                    <p className="text-muted-foreground text-sm mt-1">Order #{transaction.transaction_number}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{transaction.status.replace('_', ' ')}</span>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><p className="text-muted-foreground">Date</p><p className="font-medium text-foreground">{formatDate(transaction.created_at)}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Item</p><p className="font-medium text-foreground">{transaction.item.name}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Amount</p><p className="font-medium text-foreground">{formatPrice(transaction.amount)}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Payment Method</p><p className="font-medium text-foreground capitalize">{transaction.payment_method.replace('_', ' ')}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Delivery Method</p><p className="font-medium text-foreground capitalize">{transaction.delivery_method}</p></div>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><p className="text-muted-foreground">Seller</p><p className="font-medium text-foreground">{transaction.seller.name}</p></div>
                                <div className="flex justify-between"><p className="text-muted-foreground">Buyer</p><p className="font-medium text-foreground">{transaction.buyer.name}</p></div>
                                {transaction.delivery_address && <div className="flex justify-between items-start"><p className="text-muted-foreground">Address</p><p className="font-medium text-foreground text-right">{transaction.delivery_address}</p></div>}
                            </div>
                        </div>
                        {auth.user.id === transaction.buyer_id && transaction.status === 'pending_payment' && (
                            <div className="p-6 bg-secondary/50 border-t border-border rounded-b-lg">
                                <h3 className="font-semibold text-foreground mb-2">Action Required: Upload Payment Proof</h3>
                                <form onSubmit={handleProofUpload} className="flex items-center gap-4">
                                    <input type="file" onChange={e => setData('payment_proof', e.target.files[0])} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                                    <button disabled={processing} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"><Upload size={16}/>{processing ? 'Uploading...' : 'Upload'}</button>
                                </form>
                                {errors.payment_proof && <p className="text-sm text-red-600 mt-2">{errors.payment_proof}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}