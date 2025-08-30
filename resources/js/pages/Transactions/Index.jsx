// BUAT FILE BARU: resources/js/Pages/Transactions/Index.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, transactions }) {
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    const getStatusBadge = (status) => {
        const styles = { pending_payment: 'bg-yellow-100 text-yellow-800', paid: 'bg-blue-100 text-blue-800', completed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{status.replace('_', ' ')}</span>;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Transaction History" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Transaction History</h1>
                    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-muted-foreground">
                                <thead className="text-xs text-foreground uppercase bg-secondary"><tr className="border-b border-border"><th scope="col" className="px-6 py-3">Order ID</th><th scope="col" className="px-6 py-3">Item</th><th scope="col" className="px-6 py-3">Role</th><th scope="col" className="px-6 py-3">Total</th><th scope="col" className="px-6 py-3">Status</th><th scope="col" className="px-6 py-3">Date</th><th scope="col" className="px-6 py-3"><span className="sr-only">View</span></th></tr></thead>
                                <tbody>
                                    {transactions.data.length > 0 ? transactions.data.map(tx => (
                                        <tr key={tx.id} className="bg-card border-b border-border hover:bg-secondary">
                                            <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{tx.transaction_number}</td>
                                            <td className="px-6 py-4">{tx.item.name}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${tx.buyer_id === auth.user.id ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800'}`}>{tx.buyer_id === auth.user.id ? 'Buyer' : 'Seller'}</span></td>
                                            <td className="px-6 py-4">{formatPrice(tx.amount)}</td>
                                            <td className="px-6 py-4 capitalize">{getStatusBadge(tx.status)}</td>
                                            <td className="px-6 py-4">{formatDate(tx.created_at)}</td>
                                            <td className="px-6 py-4 text-right"><Link href={route('transactions.show', tx.id)} className="font-semibold text-primary hover:underline">View Details</Link></td>
                                        </tr>
                                    )) : <tr><td colSpan="7" className="text-center py-16"><h3 className="text-xl font-semibold text-foreground">No Transactions Found</h3><p className="mt-2 text-muted-foreground">Your transaction history is empty.</p></td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}