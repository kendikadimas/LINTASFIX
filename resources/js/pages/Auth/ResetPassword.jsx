// BUAT ATAU GANTI ISI FILE: resources/js/Pages/Auth/ResetPassword.jsx

import { Head, useForm, Link } from '@inertiajs/react';
import { ShoppingBag, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useEffect, useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="text-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-foreground">Set a New Password</h1>
                <p className="mt-2 text-muted-foreground">
                    Create a new, strong password for your account.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            className="w-full block pl-10 pr-4 py-3 bg-background border border-border rounded-lg disabled:opacity-50"
                            onChange={(e) => setData('email', e.target.value)}
                            disabled
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password"  className="block text-sm font-semibold text-foreground mb-2">New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            className="w-full block pl-10 pr-10 py-3 bg-background border border-border rounded-lg"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                         <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
                
                <div>
                    <label htmlFor="password_confirmation"  className="block text-sm font-semibold text-foreground mb-2">Confirm New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            id="password_confirmation"
                            type={showConfirm ? 'text' : 'password'}
                            value={data.password_confirmation}
                            className="w-full block pl-10 pr-10 py-3 bg-background border border-border rounded-lg"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                         <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
                </div>

                <div className="pt-2">
                    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50" disabled={processing}>
                        Reset Password
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}