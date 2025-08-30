// GANTI SELURUH ISI FILE: resources/js/Pages/Items/Index.jsx DENGAN INI

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { PlusCircle, Trash2, Edit, View } from 'lucide-react';

export default function Index({ auth, items = { data: [], links: [] } }) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelect = (id) => {
        setSelectedItems(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e) => {
        setSelectedItems(e.target.checked ? items.data.map(i => i.id) : []);
    };
    
    const handleBulkDelete = () => {
        if (selectedItems.length === 0) return;
        if (confirm(`Are you sure you want to delete ${selectedItems.length} selected item(s)?`)) {
            router.post(route('items.bulk-delete'), { // Assuming you have a bulk-delete route
                ids: selectedItems
            }, {
                onSuccess: () => setSelectedItems([])
            });
        }
    };

    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    const getStatusBadge = (status) => {
        const styles = {
            available: 'bg-green-100 text-green-800',
            rented: 'bg-yellow-100 text-yellow-800',
            sold: 'bg-red-100 text-red-800',
            maintenance: 'bg-gray-100 text-gray-800',
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || styles.maintenance}`}>{status}</span>;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-serif font-bold text-foreground">My Items</h1>
                        <Link href={route('items.create')} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                            <PlusCircle size={18} />
                            Add New Item
                        </Link>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 flex items-center gap-4 border-b border-border">
                            {selectedItems.length > 0 && (
                                <button onClick={handleBulkDelete} className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-800">
                                    <Trash2 size={16} /> Delete ({selectedItems.length})
                                </button>
                            )}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-muted-foreground">
                                <thead className="text-xs text-foreground uppercase bg-secondary">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <input type="checkbox" onChange={handleSelectAll} checked={items.data.length > 0 && selectedItems.length === items.data.length} className="rounded border-border text-primary focus:ring-primary" />
                                        </th>
                                        <th scope="col" className="px-6 py-3">Item Name</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.data.length > 0 ? items.data.map((item) => (
                                        <tr key={item.id} className="bg-card border-b border-border hover:bg-secondary">
                                            <td className="w-4 p-4">
                                                <input type="checkbox" onChange={() => handleSelect(item.id)} checked={selectedItems.includes(item.id)} className="rounded border-border text-primary focus:ring-primary" />
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{item.name}</th>
                                            <td className="px-6 py-4 capitalize">{getStatusBadge(item.status)}</td>
                                            <td className="px-6 py-4">{formatPrice(item.price)}</td>
                                            <td className="px-6 py-4">{item.category?.name || 'N/A'}</td>
                                            <td className="px-6 py-4 flex justify-end gap-4">
                                                <Link href={route('items.show', item.id)} className="font-medium text-muted-foreground hover:text-primary"><View size={16}/></Link>
                                                <Link href={route('items.edit', item.id)} className="font-medium text-muted-foreground hover:text-primary"><Edit size={16}/></Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-16">
                                                <h3 className="text-xl font-semibold text-foreground">No Items Yet</h3>
                                                <p className="mt-2 text-muted-foreground">You haven't listed any items. Click "Add New Item" to start.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination can be added here if needed */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}