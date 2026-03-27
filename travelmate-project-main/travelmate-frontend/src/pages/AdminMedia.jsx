import React, { useState } from 'react';
import { Upload, ImageIcon, Copy, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AdminMedia = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadedUrl(response.data.imageUrl);
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload image. Please check your Cloudinary configuration.');
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uploadedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-black text-secondary mb-2">Media Manager</h1>
                <p className="text-slate-500 font-bold mb-10">Upload images to Cloudinary and get URLs for your content.</p>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <div
                        className={`border-4 border-dashed rounded-[2rem] p-12 transition-all ${preview ? 'border-primary bg-emerald-50/30' : 'border-slate-100 hover:border-slate-200'
                            }`}
                    >
                        {preview ? (
                            <div className="space-y-6">
                                <img src={preview} alt="Preview" className="max-h-80 mx-auto rounded-2xl shadow-lg border-2 border-white" />
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => { setFile(null); setPreview(null); setUploadedUrl(''); }}
                                        className="px-6 py-3 text-slate-400 font-bold hover:text-rose-500 transition-colors"
                                    >
                                        Remove
                                    </button>
                                    {!uploadedUrl && (
                                        <button
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg flex items-center space-x-2"
                                        >
                                            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                                            <span>{uploading ? 'Uploading...' : 'Upload to Cloudinary'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <label className="cursor-pointer block">
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="p-6 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-primary transition-colors">
                                        <ImageIcon className="h-12 w-12" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-secondary">Click to upload image</p>
                                        <p className="text-sm font-bold text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                                    </div>
                                </div>
                            </label>
                        )}
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center space-x-3 text-rose-600 font-bold">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {uploadedUrl && (
                        <div className="mt-10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-3 text-emerald-600 font-bold justify-center">
                                <CheckCircle2 className="h-5 w-5" />
                                <span>Upload Successful!</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={uploadedUrl}
                                    className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-xs text-slate-500 outline-none"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="bg-secondary text-white p-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
                                    title="Copy URL"
                                >
                                    {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                </button>
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left pl-2">
                                Copy this URL and use it in your destination or hotel image fields.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMedia;
