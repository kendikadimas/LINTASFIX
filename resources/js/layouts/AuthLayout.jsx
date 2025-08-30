// BUAT FILE BARU: resources/js/Layouts/AuthLayout.jsx

import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans">
            {/* --- Kolom Kiri (Hero/Visual) --- */}
            <div className="hidden bg-secondary lg:flex flex-col items-center justify-center p-12 text-center relative">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="flex items-center gap-2">
                        <ShoppingBag className="h-7 w-7 text-primary" />
                        <span className="text-2xl font-bold text-foreground tracking-tighter">LINTAS</span>
                    </Link>
                </div>
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-serif font-bold text-foreground leading-tight">
                        Platform Jual Beli dan Sewa Peralatan Akademik.
                    </h1>
                    <p className="mt-4 text-muted-foreground">
                        Dari mahasiswa, oleh mahasiswa, untuk mahasiswa. Temukan semua kebutuhan praktikum dan perkuliahan Anda di sini.
                    </p>
                </div>
                <div className="absolute bottom-8 text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} LINTAS. All Rights Reserved.
                </div>
            </div>

            {/* --- Kolom Kanan (Form) --- */}
            <div className="bg-background flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}