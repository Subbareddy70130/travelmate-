import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2 } from 'lucide-react';
import { uploadImage } from '../services/adminApi';

const ImageUploadField = ({ value, onChange, label = "Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || null);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview immediately
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const data = await uploadImage(formData);
            const url = data.imageUrl;
            setPreview(url);
            onChange(url);
        } catch (err) {
            setError('Upload failed. Check your Cloudinary credentials.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        setPreview(null);
        onChange('');
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-600">{label}</label>
            {preview ? (
                <div className="relative">
                    <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-xl border border-slate-100" />
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    {value && value.startsWith('http') && (
                        <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Uploaded
                        </div>
                    )}
                </div>
            ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-200 rounded-xl hover:border-primary transition-colors bg-slate-50">
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    {uploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    ) : (
                        <>
                            <ImageIcon className="h-8 w-8 text-slate-300 mb-2" />
                            <span className="text-sm font-bold text-slate-400">Click to upload image</span>
                        </>
                    )}
                </label>
            )}
            {error && <p className="text-xs text-rose-500 font-bold">{error}</p>}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Or paste image URL directly"
                    value={value || ''}
                    onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
                    className="flex-grow text-xs p-2 border border-slate-100 rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-primary"
                />
            </div>
        </div>
    );
};

export default ImageUploadField;
