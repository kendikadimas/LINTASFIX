// GANTI SELURUH ISI FILE: resources/js/Pages/Items/Create.jsx

import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UploadCloud, X, DollarSign, CalendarDays } from 'lucide-react';

// --- Komponen-komponen Form yang Dioptimalkan (untuk menghindari bug input) ---
const InputField = React.memo(({ label, name, value, onChange, error, ...props }) => (<div><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}</label><input id={name} name={name} value={value} onChange={onChange} className="w-full p-2 bg-background border border-border rounded-md" {...props} />{error && <p className="text-sm text-red-600 mt-1">{error}</p>}</div>));
const SelectField = React.memo(({ label, name, value, onChange, error, children, ...props }) => (<div><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="w-full p-2 bg-background border border-border rounded-md" {...props}>{children}</select>{error && <p className="text-sm text-red-600 mt-1">{error}</p>}</div>));
const TextareaField = React.memo(({ label, name, value, onChange, error, ...props }) => (<div><label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">{label}</label><textarea id={name} name={name} value={value} onChange={onChange} className="w-full p-2 bg-background border border-border rounded-md" {...props}></textarea>{error && <p className="text-sm text-red-600 mt-1">{error}</p>}</div>));

export default function Create({ auth, categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        rental_price_per_day: '',
        deposit_amount: '',
        category_id: '',
        condition: 'good',
        location: '',
        availability_type: 'sale',
        images: [],
    });
    
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', files);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(newPreviews);
    };

    const removeImage = (index) => {
        const newImages = [...data.images];
        const newPreviews = [...imagePreviews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setData('images', newImages);
        setImagePreviews(newPreviews);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/items', {
            onSuccess: () => imagePreviews.forEach(url => URL.revokeObjectURL(url)),
            forceFormData: true,
        });
    };
    
    return (
        <AuthenticatedLayout user={auth.user} header="Add New Item">
            <Head title="Add New Item" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-10"><h1 className="text-4xl font-serif font-bold text-foreground">Add a New Item</h1><p className="mt-2 text-muted-foreground">Fill out the details below to list your academic gear.</p></div>
                    <form onSubmit={submit} className="bg-card border border-border rounded-lg shadow-sm p-8 space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="border-b border-border pb-8"><h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="md:col-span-2"><InputField label="Item Name *" name="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} error={errors.name} required /></div><SelectField label="Category *" name="category_id" value={data.category_id} onChange={e => setData('category_id', e.target.value)} error={errors.category_id} required><option value="">Select a category</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</SelectField><SelectField label="Condition *" name="condition" value={data.condition} onChange={e => setData('condition', e.target.value)} error={errors.condition} required><option value="excellent">Excellent</option><option value="good">Good</option><option value="fair">Fair</option></SelectField></div></div>
                        
                        {/* Section 2: Availability & Pricing */}
                        <div className="border-b border-border pb-8">
                           <h2 className="text-lg font-semibold text-foreground mb-4">Availability & Pricing</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField label="Availability Type *" name="availability_type" value={data.availability_type} onChange={e => setData('availability_type', e.target.value)} error={errors.availability_type} required>
                                    <option value="sale">For Sale Only</option>
                                    <option value="rent">For Rent Only</option>
                                    <option value="both">For Sale and Rent</option>
                                </SelectField>
                                <InputField label="Location" name="location" type="text" placeholder="e.g. Jakarta Selatan" value={data.location} onChange={e => setData('location', e.target.value)} error={errors.location} />
                                
                                {/* Conditional Sale Price */}
                                {['sale', 'both'].includes(data.availability_type) && (
                                    <InputField label="Sale Price (Rp) *" name="price" type="number" placeholder="50000" min="0" value={data.price} onChange={e => setData('price', e.target.value)} error={errors.price} required />
                                )}
                                
                                {/* Conditional Rental Price */}
                                {['rent', 'both'].includes(data.availability_type) && (
                                    <InputField label="Rental Price per Day (Rp) *" name="rental_price_per_day" type="number" placeholder="10000" min="0" value={data.rental_price_per_day} onChange={e => setData('rental_price_per_day', e.target.value)} error={errors.rental_price_per_day} required />
                                )}
                                {['rent', 'both'].includes(data.availability_type) && (
                                    <InputField label="Security Deposit (Rp)" name="deposit_amount" type="number" placeholder="50000" min="0" value={data.deposit_amount} onChange={e => setData('deposit_amount', e.target.value)} error={errors.deposit_amount} />
                                )}
                           </div>
                        </div>
                        
                        {/* ... sisa form (Description & Images) tetap sama ... */}
                        <div><h2 className="text-lg font-semibold text-foreground mb-4">Details</h2><div className="space-y-6"><TextareaField label="Description *" name="description" value={data.description} onChange={e => setData('description', e.target.value)} error={errors.description} rows="5" placeholder="Describe your item..." required /><div><label className="block text-sm font-semibold text-foreground mb-2">Images</label><div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10"><div className="text-center"><UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" /><div className="mt-4 flex text-sm leading-6 text-muted-foreground"><label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"><span>Upload files</span><input id="file-upload" name="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="sr-only" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 2MB</p></div></div>{imagePreviews.length > 0 && <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">{imagePreviews.map((preview, index) => (<div key={index} className="relative rounded-lg overflow-hidden border border-border"><img src={preview} alt="" className="h-24 w-full object-cover" /><button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/75"><X size={14}/></button></div>))}</div>}</div></div></div>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4"><Link href={'/my-items'} className="text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</Link><button type="submit" disabled={processing} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50">{processing ? 'Publishing...' : 'Publish Item'}</button></div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}