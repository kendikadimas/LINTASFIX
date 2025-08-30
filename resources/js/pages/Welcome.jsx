import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, items = [], categories = [], stats = {} }) {
    return (
        <>
            <Head title="Welcome to LintasInn" />
            
            <div className="min-h-screen gradient-mesh relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-20 right-20 w-96 h-96 pattern-dots opacity-30 animate-float"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 pattern-grid opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-stone-100/5 to-amber-100/5 -z-10"></div>

                {/* Navigation */}
                <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-amber-100 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="bg-amber-50 p-2 rounded-md">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M3 10L12 3l9 7v8a1 1 0 0 1-1 1h-3v-6H7v6H4a1 1 0 0 1-1-1v-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-lg font-semibold text-stone-100 tracking-wide">LintasInn</span>
                                    <div className="text-xs text-stone-400 font-light">Academic Marketplace</div>
                                </div>
                            </Link>

                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <>
                                        <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
                                        <Link href="/browse" className="btn btn-ghost">Browse</Link>
                                        <span className="text-amber-700 font-medium">Welcome, {auth.user.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="btn btn-ghost">Login</Link>
                                        <Link href="/register" className="btn btn-primary">Join Us</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-6xl mx-auto px-4 py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column */}
                            <div className="animate-slide-in">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-stone-800 mb-6 leading-tight">
                                <span className="text-gradient">LintasInn</span>
                                <br />
                                <span className="text-stone-600 font-light">Platform Mahasiswa Modern</span>
                            </h1>
                            
                            <div className="border-gradient mb-8"></div>
                            
                            <p className="text-lg text-stone-600 mb-12 leading-relaxed font-light">
                                Jual beli peralatan kuliah dan praktikum dengan desain minimalis dan pengalaman yang elegan. 
                                Bergabunglah dengan komunitas mahasiswa terdepan di Indonesia.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/browse" className="btn btn-primary px-8 py-3 elevated-card">
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>Explore Items</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </span>
                                </Link>
                                <Link href="/register" className="btn btn-ghost px-8 py-3">Start Selling</Link>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                            {/* Stats Cards */}
                            <div className="glass-effect p-6 rounded-lg">
                                <h3 className="text-2xl font-medium text-stone-800 mb-4">Platform Statistics</h3>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-amber-400 mb-2">{stats.totalItems || 0}</div>
                                        <div className="text-xs text-stone-400">Items</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-400 mb-2">{stats.totalUsers || 0}</div>
                                        <div className="text-xs text-stone-400">Members</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.totalCategories || 0}</div>
                                        <div className="text-xs text-stone-400">Categories</div>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Categories */}
                            <div className="glass-effect p-6 rounded-lg">
                                <h3 className="text-xl font-medium text-stone-800 mb-4">Popular Categories</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {categories.slice(0, 4).map((category, index) => (
                                        <Link key={category.id} href={`/browse?category=${category.slug}`} className="group p-4 rounded-md border border-stone-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 text-center" style={{ animationDelay: `${0.1 * index}s` }}>
                                            <div className="text-2xl mb-2">{category.icon || (
                                                <svg className="w-7 h-7 mx-auto text-amber-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                    <path d="M3 7h6v10H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}</div>
                                            <h4 className="font-medium text-stone-800 text-sm">{category.name}</h4>
                                            <p className="text-xs text-stone-500 mt-1">{category.items_count} items</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-stone-100/50 py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16 animate-slide-in">
                            <h2 className="text-4xl font-extralight text-stone-800 mb-4">
                                Why Choose <span className="text-gradient font-light">LintasInn?</span>
                            </h2>
                            <div className="border-gradient w-16 mx-auto mb-6"></div>
                            <p className="text-stone-600 font-light max-w-2xl mx-auto">
                                Platform marketplace yang dirancang khusus untuk kebutuhan mahasiswa Indonesia
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <svg className="w-8 h-8 mx-auto text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ),
                                    title: 'Focused on Students',
                                    description: 'Platform khusus untuk kebutuhan akademik mahasiswa Indonesia'
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8 mx-auto text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ),
                                    title: 'Safe & Secure',
                                    description: 'Transaksi aman dengan verifikasi pengguna dan panduan keamanan'
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8 mx-auto text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ),
                                    title: 'Easy to Use',
                                    description: 'Interface minimalis dan intuitif untuk pengalaman yang menyenangkan'
                                }
                            ].map((feature, index) => (
                                <div 
                                    key={index}
                                    className="glass-effect p-8 text-center elevated-card group animate-slide-in"
                                    style={{ animationDelay: `${0.2 * index}s` }}
                                >
                                    <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-light text-stone-800 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-stone-600 font-light leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-20">
                    <div className="max-w-4xl mx-auto px-4 text-center animate-slide-in">
                        <h2 className="text-4xl font-extralight text-stone-800 mb-8">
                            Ready to <span className="text-gradient font-light">Start?</span>
                        </h2>
                        <div className="border-gradient w-16 mx-auto mb-8"></div>
                        <p className="text-lg text-stone-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                            Bergabunglah dengan ribuan mahasiswa Indonesia yang sudah merasakan kemudahan 
                            jual beli peralatan kuliah di LintasInn.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                            <Link href="/register" className="bg-gradient-to-r from-amber-800 to-amber-900 text-stone-100 px-8 py-4 hover:from-amber-900 hover:to-amber-950 font-light transition-all duration-300 flex-1 text-center elevated-card interactive-hover">
                                Create Account
                            </Link>
                            <Link href="/browse" className="border-2 border-stone-400 text-stone-700 px-8 py-4 hover:bg-stone-100 font-light transition-all duration-300 flex-1 text-center interactive-hover">
                                Browse Items
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="glass-effect border-t border-stone-200/50 py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="animate-slide-in">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-gradient-to-br from-amber-400 to-pink-400 p-2 rounded-md">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M3 10L12 3l9 7v8a1 1 0 0 1-1 1h-3v-6H7v6H4a1 1 0 0 1-1-1v-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light text-stone-100 text-gradient">LintasInn</h3>
                                        <div className="text-xs text-stone-400 font-light">Academic Marketplace</div>
                                    </div>
                                </div>
                                <p className="text-stone-600 font-light leading-relaxed">
                                    Platform marketplace minimalis untuk mahasiswa Indonesia dengan desain elegan dan pengalaman yang sederhana.
                                </p>
                            </div>
                            
                            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
                                <h4 className="text-lg font-light text-stone-800 mb-6">Quick Links</h4>
                                <div className="space-y-3">
                                    <Link href="/browse" className="block text-stone-600 hover:text-amber-700 font-light transition-all duration-300 interactive-hover">Browse Items</Link>
                                    <Link href="/register" className="block text-stone-600 hover:text-amber-700 font-light transition-all duration-300 interactive-hover">Join Community</Link>
                                    <Link href="/help" className="block text-stone-600 hover:text-amber-700 font-light transition-all duration-300 interactive-hover">Help Center</Link>
                                </div>
                            </div>
                            
                            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
                                <h4 className="text-lg font-light text-stone-800 mb-6">Support</h4>
                                <div className="space-y-3">
                                    <Link href="/contact" className="block text-stone-600 hover:text-amber-700 font-light transition-all duration-300 interactive-hover">Contact Us</Link>
                                    <Link href="/safety" className="block text-stone-600 hover:text-amber-700 font-light transition-all duration-300 interactive-hover">Safety Tips</Link>
                                    <Link href="/privacy" className="block text-stone-600 hover:text-amber-700 font-light transition-all duration-300 interactive-hover">Privacy Policy</Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-stone-200 mt-12 pt-8 text-center">
                            <p className="text-stone-500 font-light text-sm">
                                © 2024 LintasInn. All rights reserved. Designed with minimalist elegance for Indonesian students.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
