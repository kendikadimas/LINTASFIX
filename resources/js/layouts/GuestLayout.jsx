// BUAT FILE BARU: resources/js/Layouts/GuestLayout.jsx

import { Link } from '@inertiajs/react';
import { ShoppingBag, LogIn } from 'lucide-react';

export default function GuestLayout({ auth, children }) {
    return (
        <div className="bg-background font-sans">
            {/* Header */}
            <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center gap-2">
                            <ShoppingBag className="h-7 w-7 text-primary" />
                            <span className="text-2xl font-bold text-foreground tracking-tighter">LINTAS</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <Link href="/browse" className="text-primary font-semibold">Shop</Link>
                            {/* Tambahkan link lain jika perlu */}
                        </nav>
                        <div className="flex items-center gap-4">
                            {auth && auth.user ? (
                                <Link href="/dashboard" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                                    <LogIn size={16} />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Konten Halaman */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-secondary mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} LINTAS. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}