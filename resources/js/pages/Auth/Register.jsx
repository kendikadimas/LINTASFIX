// GANTI SELURUH ISI FILE: resources/js/Pages/Auth/Register.jsx

import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout'; // Impor layout baru

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/register'); // Menggunakan URL manual
    };

    return (
        <AuthLayout>
            <Head title="Create Account" />
            
            <div className="text-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-foreground">Buat Akun Baru</h1>
                <p className="text-muted-foreground mt-2">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Masuk di sini
                    </Link>
                </p>
            </div>
            
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className={`w-full block pl-10 pr-4 py-3 bg-background border ${errors.name ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-ring focus:outline-none`} placeholder="Nama Lengkap Anda" autoComplete="name" autoFocus />
                    </div>
                    {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={`w-full block pl-10 pr-4 py-3 bg-background border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-ring focus:outline-none`} placeholder="you@kampus.ac.id" autoComplete="username" />
                    </div>
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input id="password" type={showPassword ? 'text' : 'password'} value={data.password} onChange={(e) => setData('password', e.target.value)} className={`w-full block pl-10 pr-10 py-3 bg-background border ${errors.password ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-ring focus:outline-none`} placeholder="Buat password" autoComplete="new-password" />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                    </div>
                    {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-semibold text-foreground mb-2">Konfirmasi Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input id="password_confirmation" type={showConfirmPassword ? 'text' : 'password'} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="w-full block pl-10 pr-10 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Ulangi password" autoComplete="new-password" />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    {processing ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </AuthLayout>
    );
}