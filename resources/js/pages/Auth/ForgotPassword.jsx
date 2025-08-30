// BUAT ATAU GANTI ISI FILE: resources/js/Pages/Auth/ForgotPassword.jsx

import { Head, useForm, Link } from '@inertiajs/react';
import { ShoppingBag, Mail, ArrowLeft } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            
            <div className="text-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-foreground">Forgot Your Password?</h1>
                <p className="mt-2 text-muted-foreground">
                    No problem. Enter your email address below and we'll send you a password reset link.
                </p>
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 p-3 rounded-md">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full block pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:outline-none"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="mt-6">
                    <button className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50" disabled={processing}>
                        Email Password Reset Link
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <Link href={route('login')} className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}