// GANTI SELURUH ISI FILE: resources/js/Pages/Auth/Login.jsx

import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout'; // Impor layout baru

export default function Login({ status, canResetPassword = true }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/login'); // Menggunakan URL manual
    };

    return (
        <AuthLayout>
            <Head title="Sign In" />
            
            <div className="text-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-foreground">Selamat Datang Kembali</h1>
                <p className="text-muted-foreground mt-2">
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-700 bg-green-100 p-3 rounded-md">{status}</div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`w-full block pl-10 pr-4 py-3 bg-background border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-ring focus:outline-none`}
                            placeholder="you@kampus.ac.id"
                            autoComplete="username"
                            autoFocus
                        />
                    </div>
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <div className="flex justify-between">
                        <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">Password</label>
                        {canResetPassword && (
                            <Link href="/forgot-password" className="text-sm font-semibold text-primary hover:underline">
                                Lupa password?
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full block pl-10 pr-10 py-3 bg-background border ${errors.password ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-ring focus:outline-none`}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground">Remember me</label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    {processing ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </AuthLayout>
    );
}