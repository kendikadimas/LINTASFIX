// BUAT FILE BARU ATAU GANTI ISI: resources/js/Pages/Rentals/Index.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, rentals }) {
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            ongoing: 'bg-indigo-100 text-indigo-800',
            returned: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            overdue: 'bg-orange-100 text-orange-800'
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{status.replace('_', ' ')}</span>;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Rental History" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Rental History</h1>
                    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-muted-foreground">
                                <thead className="text-xs text-foreground uppercase bg-secondary">
                                    <tr className="border-b border-border">
                                        <th scope="col" className="px-6 py-3">Rental ID</th>
                                        <th scope="col" className="px-6 py-3">Item</th>
                                        <th scope="col" className="px-6 py-3">Role</th>
                                        <th scope="col" className="px-6 py-3">Period</th>
                                        <th scope="col" className="px-6 py-3">Total</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3"><span className="sr-only">View</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rentals.data.length > 0 ? rentals.data.map(rental => (
                                        <tr key={rental.id} className="bg-card border-b border-border hover:bg-secondary">
                                            <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{rental.rental_number || `RNT-${rental.id}`}</td>
                                            <td className="px-6 py-4">{rental.item.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${rental.renter_id === auth.user.id ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800'}`}>
                                                    {rental.renter_id === auth.user.id ? 'Renter' : 'Owner'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{formatDate(rental.start_date)} - {formatDate(rental.end_date)}</td>
                                            <td className="px-6 py-4">{formatPrice(rental.total_amount)}</td>
                                            <td className="px-6 py-4 capitalize">{getStatusBadge(rental.status)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={route('rentals.show', rental.id)} className="font-semibold text-primary hover:underline">View Details</Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-16">
                                                <h3 className="text-xl font-semibold text-foreground">No Rentals Found</h3>
                                                <p className="mt-2 text-muted-foreground">Your rental history is empty.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}