import { Link } from '@inertiajs/react';

export default function MinimalistLayout({ children, auth, title }) {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="bg-amber-50 p-2 rounded-md flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M3 10L12 3l9 7v8a1 1 0 0 1-1 1h-3v-6H7v6H4a1 1 0 0 1-1-1v-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-lg font-semibold text-stone-800 tracking-wide">LintasInn</span>
                                <div className="text-xs text-stone-500">Academic Marketplace</div>
                            </div>
                        </Link>

                        <div className="flex items-center space-x-3">
                            <Link href="/browse" className="btn btn-ghost">Browse</Link>
                            {auth?.user ? (
                                <>
                                    <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
                                    <Link href="/items/create" className="btn btn-primary">Sell</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="btn btn-ghost">Login</Link>
                                    <Link href="/register" className="btn btn-primary">Join</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Title */}
            {title && (
                <div className="bg-stone-50 border-b border-stone-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-2xl font-semibold text-stone-800">
                            {title}
                        </h1>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}
