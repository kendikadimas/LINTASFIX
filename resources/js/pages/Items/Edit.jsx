import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UploadCloud, X } from 'lucide-react';

const InputField = React.memo(({ label, name, value, onChange, error, ...props }) => (<div><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}</label><input id={name} name={name} value={value} onChange={onChange} className="w-full p-2 bg-background border border-border rounded-md" {...props} />{error && <p className="text-sm text-red-600 mt-1">{error}</p>}</div>));
const SelectField = React.memo(({ label, name, value, onChange, error, children, ...props }) => (<div><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="w-full p-2 bg-background border border-border rounded-md" {...props}>{children}</select>{error && <p className="text-sm text-red-600 mt-1">{error}</p>}</div>));
const TextareaField = React.memo(({ label, name, value, onChange, error, ...props }) => (<div><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}</label><textarea id={name} name={name} value={value} onChange={onChange} className="w-full p-2 bg-background border border-border rounded-md" {...props}></textarea>{error && <p className="text-sm text-red-600 mt-1">{error}</p>}</div>));

export default function Edit({ auth, item, categories = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        rental_price_per_day: item.rental_price_per_day || '',
        deposit_amount: item.deposit_amount || '',
        category_id: item.category_id || '',
        condition: item.condition || 'good',
        location: item.location || '',
        availability_type: item.availability_type || 'sale',
        brand: item.brand || '',
        model: item.model || '',
        year_purchased: item.year_purchased || '',
        stock_quantity: item.stock_quantity || 1,
        notes: item.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/items/${item.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Edit Item">
            <Head title="Edit Item" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-serif font-bold text-foreground">Edit Item</h1>
                        <p className="mt-2 text-muted-foreground">Update the details of your academic gear.</p>
                    </div>
                    <form onSubmit={submit} className="bg-card border border-border rounded-lg shadow-sm p-8 space-y-8">
                        <div className="border-b border-border pb-8">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputField label="Item Name *" name="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} error={errors.name} required />
                                </div>
                                <SelectField label="Category *" name="category_id" value={data.category_id} onChange={e => setData('category_id', e.target.value)} error={errors.category_id} required>
                                    <option value="">Select a category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </SelectField>
                                <SelectField label="Condition *" name="condition" value={data.condition} onChange={e => setData('condition', e.target.value)} error={errors.condition} required>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="poor">Poor</option>
                                </SelectField>
                            </div>
                        </div>

                        <div className="border-b border-border pb-8">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Availability & Pricing</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField label="Availability Type *" name="availability_type" value={data.availability_type} onChange={e => setData('availability_type', e.target.value)} error={errors.availability_type} required>
                                    <option value="sale">For Sale Only</option>
                                    <option value="rent">For Rent Only</option>
                                    <option value="both">For Sale and Rent</option>
                                </SelectField>
                                <InputField label="Location" name="location" type="text" placeholder="e.g. Jakarta Selatan" value={data.location} onChange={e => setData('location', e.target.value)} error={errors.location} />
                                {['sale', 'both'].includes(data.availability_type) && (
                                    <InputField label="Sale Price (Rp) *" name="price" type="number" placeholder="50000" min="0" value={data.price} onChange={e => setData('price', e.target.value)} error={errors.price} required />
                                )}
                                {['rent', 'both'].includes(data.availability_type) && (
                                    <InputField label="Rental Price per Day (Rp) *" name="rental_price_per_day" type="number" placeholder="10000" min="0" value={data.rental_price_per_day} onChange={e => setData('rental_price_per_day', e.target.value)} error={errors.rental_price_per_day} required />
                                )}
                                {['rent', 'both'].includes(data.availability_type) && (
                                    <InputField label="Security Deposit (Rp)" name="deposit_amount" type="number" placeholder="50000" min="0" value={data.deposit_amount} onChange={e => setData('deposit_amount', e.target.value)} error={errors.deposit_amount} />
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-foreground mb-4">Details</h2>
                            <div className="space-y-6">
                                <TextareaField label="Description *" name="description" value={data.description} onChange={e => setData('description', e.target.value)} error={errors.description} rows="5" placeholder="Describe your item..." required />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="Brand" name="brand" type="text" placeholder="e.g. ASUS" value={data.brand} onChange={e => setData('brand', e.target.value)} error={errors.brand} />
                                    <InputField label="Model" name="model" type="text" placeholder="e.g. ROG Zephyrus" value={data.model} onChange={e => setData('model', e.target.value)} error={errors.model} />
                                    <InputField label="Year Purchased" name="year_purchased" type="number" placeholder="e.g. 2023" min="1900" max={new Date().getFullYear()} value={data.year_purchased} onChange={e => setData('year_purchased', e.target.value)} error={errors.year_purchased} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Stock Quantity *" name="stock_quantity" type="number" min="1" value={data.stock_quantity} onChange={e => setData('stock_quantity', e.target.value)} error={errors.stock_quantity} required />
                                    <InputField label="Notes" name="notes" type="text" placeholder="Additional notes..." value={data.notes} onChange={e => setData('notes', e.target.value)} error={errors.notes} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link href={'/my-items'} className="text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</Link>
                            <button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50">{processing ? 'Saving...' : 'Save Changes'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
