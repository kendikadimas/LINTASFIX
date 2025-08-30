// GANTI ISI FILE: resources/js/Pages/Dashboard.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Package, CalendarClock, Repeat, PlusCircle, ShoppingCart, Calendar } from 'lucide-react';

// ... (Komponen StatCard dan ActivityItem tetap sama)
const StatCard = ({ icon, title, value }) => (
    <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
        <div className="bg-secondary p-3 rounded-md">{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
    </div>
);
const ActivityItem = ({ icon, title, status, link }) => (
    <li className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
        <div className="flex items-center gap-4">
            {icon}
            <div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground capitalize">{status.replace('_', ' ')}</p>
            </div>
        </div>
        <Link href={link} className="text-sm font-semibold text-primary hover:underline">Details</Link>
    </li>
);
// ...

export default function Dashboard({ auth, stats = {}, recentItems = [], recentTransactions = [], recentRentals = [] }) {
    const recentActivities = [...recentTransactions, ...recentRentals]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    return (
        // PERUBAHAN DI SINI: Mengirim judul sebagai prop 'header'
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard" 
        >
            <Head title="Dashboard" />

            {/* Konten utama halaman dashboard sekarang berada di dalam container yang bisa di-scroll */}
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header di dalam konten */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, {auth.user.name}!</h1>
                            <p className="mt-1 text-muted-foreground">Here's a summary of your activities on LINTAS.</p>
                        </div>
                        <Link href="/items/create" className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                            <PlusCircle size={18} />
                            Add New Item
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard icon={<Package size={24} className="text-primary"/>} title="Your Items Listed" value={stats.myItems || 0} />
                        <StatCard icon={<CalendarClock size={24} className="text-primary"/>} title="Active Rentals" value={stats.myActiveRentals || 0} />
                        <StatCard icon={<Repeat size={24} className="text-primary"/>} title="Total Transactions" value={stats.myTransactions || 0} />
                    </div>

                    {/* Recent Activities & Items */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-serif font-bold text-foreground mb-4">Recent Activities</h2>
                            {recentActivities.length > 0 ? (
                                <ul className="divide-y divide-border">
                                    {recentActivities.map(activity => {
                                        const activityLink = activity.transaction_number ? `/transactions/${activity.id}` : `/rentals/${activity.id}`;
                                        return (
                                            <ActivityItem
                                                key={`${activity.id}-${activity.transaction_number ? 'txn' : 'rnt'}`}
                                                icon={activity.transaction_number ? <ShoppingCart className="text-muted-foreground"/> : <Calendar className="text-muted-foreground"/>}
                                                title={activity.transaction_number ? `Purchase: ${activity.item.name}` : `Rental: ${activity.item.name}`}
                                                status={activity.status}
                                                link={activityLink}
                                            />
                                        );
                                    })}
                                </ul>
                            ) : <p className="text-muted-foreground text-sm">No recent activities found.</p>}
                        </div>

                        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-serif font-bold text-foreground mb-4">Your Recent Items</h2>
                            {recentItems.length > 0 ? (
                                <ul className="divide-y divide-border">
                                    {recentItems.map(item => {
                                        const itemUrl = `/items/${item.slug || item.id}`;
                                        return (
                                            <li key={item.id} className="flex justify-between items-center py-3">
                                                <div>
                                                    <p className="font-semibold text-foreground">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">{item.category?.name}</p>
                                                </div>
                                                <Link href={itemUrl} className="text-sm font-semibold text-primary hover:underline">View</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : <p className="text-muted-foreground text-sm">You haven't listed any items yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}