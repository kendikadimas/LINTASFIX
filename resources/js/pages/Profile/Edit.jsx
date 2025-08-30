// GANTI SELURUH ISI FILE: resources/js/Pages/Profile/Edit.jsx DENGAN INI

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Lock, Trash2 } from 'lucide-react';

const NavLink = ({ href, active, children }) => (
    <Link href={href} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-secondary text-primary' : 'text-foreground hover:bg-secondary'}`}>
        {children}
    </Link>
);

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });
    
    // Form for password update (add this)
    const { data: passwordData, setData: setPasswordData, put: putPassword, errors: passwordErrors, processing: passwordProcessing, recentlySuccessful: passwordSuccessful, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };
    
    const submitPassword = (e) => {
        e.preventDefault();
        putPassword(route('password.update'), {
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile Settings" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <h1 className="text-4xl font-serif font-bold text-foreground">Account Settings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar Nav */}
                        <nav className="md:col-span-1 space-y-1">
                            <NavLink href={route('profile.edit')} active><User size={16}/> Profile</NavLink>
                            {/* You can add more links here if you create the pages */}
                            <NavLink href={'#'}><Lock size={16}/> Password</NavLink>
                            <NavLink href={'#'}><Trash2 size={16}/> Danger Zone</NavLink>
                        </nav>

                        {/* Main Content */}
                        <div className="md:col-span-3 space-y-8">
                            {/* Profile Information Card */}
                            <div className="bg-card border border-border rounded-lg shadow-sm">
                                <form onSubmit={submitProfile}>
                                    <div className="p-6 border-b border-border"><h2 className="text-lg font-semibold text-foreground">Profile Information</h2><p className="mt-1 text-sm text-muted-foreground">Update your account's profile information and email address.</p></div>
                                    <div className="p-6 space-y-4">
                                        <div><label className="text-sm font-medium">Name</label><input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 w-full p-2 bg-background border border-border rounded-md"/>{errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}</div>
                                        <div><label className="text-sm font-medium">Email</label><input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1 w-full p-2 bg-background border border-border rounded-md"/>{errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}</div>
                                    </div>
                                    <div className="flex items-center gap-4 p-6 bg-secondary/50 rounded-b-lg">
                                        <button disabled={processing} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary/90 disabled:opacity-50">Save</button>
                                        {recentlySuccessful && <p className="text-sm text-muted-foreground">Saved.</p>}
                                    </div>
                                </form>
                            </div>

                            {/* Update Password Card */}
                            <div className="bg-card border border-border rounded-lg shadow-sm">
                                <form onSubmit={submitPassword}>
                                    <div className="p-6 border-b border-border"><h2 className="text-lg font-semibold text-foreground">Update Password</h2><p className="mt-1 text-sm text-muted-foreground">Ensure your account is using a long, random password to stay secure.</p></div>
                                    <div className="p-6 space-y-4">
                                        <div><label className="text-sm font-medium">Current Password</label><input type="password" value={passwordData.current_password} onChange={e => setPasswordData('current_password', e.target.value)} className="mt-1 w-full p-2 bg-background border border-border rounded-md"/>{passwordErrors.current_password && <p className="text-sm text-red-600 mt-1">{passwordErrors.current_password}</p>}</div>
                                        <div><label className="text-sm font-medium">New Password</label><input type="password" value={passwordData.password} onChange={e => setPasswordData('password', e.target.value)} className="mt-1 w-full p-2 bg-background border border-border rounded-md"/>{passwordErrors.password && <p className="text-sm text-red-600 mt-1">{passwordErrors.password}</p>}</div>
                                        <div><label className="text-sm font-medium">Confirm Password</label><input type="password" value={passwordData.password_confirmation} onChange={e => setPasswordData('password_confirmation', e.target.value)} className="mt-1 w-full p-2 bg-background border border-border rounded-md"/>{passwordErrors.password_confirmation && <p className="text-sm text-red-600 mt-1">{passwordErrors.password_confirmation}</p>}</div>
                                    </div>
                                    <div className="flex items-center gap-4 p-6 bg-secondary/50 rounded-b-lg">
                                        <button disabled={passwordProcessing} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary/90 disabled:opacity-50">Save</button>
                                        {passwordSuccessful && <p className="text-sm text-muted-foreground">Saved.</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}