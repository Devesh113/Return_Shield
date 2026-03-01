import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, processing, success, error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        setMessage('Uploading transaction logs...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            setStatus('processing');
            setMessage('Processing transactions and running Isolation Forest model...');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(`Successfully analyzed ${data.rows_processed} transactions.`);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setStatus('error');
                setMessage(data.detail || 'Failed to process file.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Connection error. Is the backend running?');
        }
    };

    return (
        <div className="upload-container animate-fade-in">
            <div className="upload-header">
                <h1>Upload Transactions</h1>
                <p className="text-secondary">Upload a CSV log of user transactions to run fraud analysis.</p>
            </div>

            <div className="upload-content glass-panel">
                <div
                    className={`drop-zone ${file ? 'has-file' : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {!file ? (
                        <>
                            <UploadCloud className="upload-icon" />
                            <h3>Drag & block your CSV file here</h3>
                            <p className="text-tertiary">or</p>
                            <label className="btn btn-secondary cursor-pointer mt-4">
                                Browse Files
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="hidden-input"
                                />
                            </label>
                            <p className="text-tertiary file-req">Accepts standard e-commerce formats (Invoice, CustomerID, Price, Quantity, etc.)</p>
                        </>
                    ) : (
                        <div className="file-info">
                            <File className="file-icon" />
                            <div className="file-details">
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                            </div>
                            {status === 'idle' && (
                                <button className="remove-file" onClick={() => setFile(null)}>×</button>
                            )}
                        </div>
                    )}
                </div>

                {file && status === 'idle' && (
                    <div className="upload-actions">
                        <button className="btn btn-primary btn-large w-full" onClick={handleUpload}>
                            Analyze Returns Data
                        </button>
                    </div>
                )}

                {status !== 'idle' && (
                    <div className={`status-box ${status}`}>
                        {status === 'processing' || status === 'uploading' ? (
                            <Loader className="status-icon spinning" />
                        ) : status === 'success' ? (
                            <CheckCircle className="status-icon" />
                        ) : (
                            <AlertCircle className="status-icon" />
                        )}
                        <span className="status-message">{message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;
