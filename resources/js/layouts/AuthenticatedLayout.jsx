// GANTI SELURUH ISI FILE: resources/js/Layouts/AuthenticatedLayout.jsx

import { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Package,
    Repeat,
    Calendar,
    Settings,
    LogOut,
    Menu,
    X,
    ShoppingBag,
    AlertCircle,
    CheckCircle,
    LogIn
} from 'lucide-react';

const NavLink = ({ href, active, children }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
            active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        }`}
    >
        {children}
    </Link>
);

const FlashMessage = () => {
    const { props } = usePage();
    const { success, error } = props.flash || {};
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (success || error) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error, props.flash]);

    if (!visible || (!success && !error)) {
        return null;
    }

    const isSuccess = !!success;
    const message = success || error;
    const bgColor = isSuccess ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const Icon = isSuccess ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-24 right-8 z-[100] w-full max-w-sm p-4 border rounded-lg shadow-lg ${bgColor} animate-fade-in-down`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <Icon className={`h-6 w-6 ${textColor}`} />
                </div>
                <div className="ml-3">
                    <p className={`text-sm font-semibold ${textColor}`}>{message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <button onClick={() => setVisible(false)} className={`-mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex items-center justify-center h-8 w-8 ${textColor} hover:bg-white/50`}>
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function AuthenticatedLayout({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const isLinkActive = (path) => {
        if (path === '/dashboard') {
            return url === '/dashboard';
        }
        return url.startsWith(path);
    };

    return (
        <>
            <Head title={header} />
            <div className="min-h-screen w-full bg-background font-sans flex">
                <FlashMessage />
                <aside
                    className={`
                        fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
                        flex flex-col
                        transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="flex items-center justify-between h-20 px-6 border-b border-border">
                        <Link href="/" className="flex items-center gap-2">
                            <ShoppingBag className="h-7 w-7 text-primary" />
                            <span className="text-2xl font-bold text-foreground tracking-tighter">LINTAS</span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <NavLink href={'/dashboard'} active={isLinkActive('/dashboard')}>
                            <LayoutDashboard size={18} /> Dashboard
                        </NavLink>
                        <NavLink href={'/my-items'} active={isLinkActive('/my-items')}>
                            <Package size={18} /> My Items
                        </NavLink>
                        <NavLink href={'/transactions'} active={isLinkActive('/transactions')}>
                            <Repeat size={18} /> Transactions
                        </NavLink>
                        <NavLink href={'/rentals'} active={isLinkActive('/rentals')}>
                            <Calendar size={18} /> Rentals
                        </NavLink>
                        <NavLink href={'/profile'} active={isLinkActive('/profile')}>
                            <Settings size={18} /> Settings
                        </NavLink>
                    </nav>

                    <div className="px-4 py-6 border-t border-border">
                        {user ? (
                            <div className="p-3 bg-secondary rounded-lg">
                                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                <Link href={'/logout'} method="post" as="button" className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:bg-red-100 p-2 rounded-md transition-colors">
                                    <LogOut size={16} /> Logout
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                                <LogIn size={16} />
                                Sign In / Register
                            </Link>
                        )}
                    </div>
                </aside>

                <div className="flex flex-col flex-1 w-full lg:max-h-screen">
                    <header className="sticky top-0 z-30 flex items-center h-20 px-4 sm:px-6 bg-card/95 backdrop-blur-sm border-b border-border">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground mr-4">
                            <Menu size={24} />
                            <span className="sr-only">Open sidebar</span>
                        </button>
                        <h1 className="text-xl font-semibold text-foreground">{header}</h1>
                    </header>
                    
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}