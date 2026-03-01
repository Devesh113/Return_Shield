import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import './ExplanationPage.css';

const ExplanationPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (response.ok) {
                    setUser(await response.json());
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
            setLoading(false);
        };

        fetchUser();
    }, [userId]);

    if (loading) return <div className="loading-state">Loading user data...</div>;
    if (!user) return <div className="empty-state">User not found.</div>;

    return (
        <div className="explanation-container animate-fade-in">
            <div className="header-actions">
                <Link to="/dashboard" className="btn btn-secondary btn-small">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>

            <div className="explanation-grid">
                {/* Left Column: User Profile & Stats */}
                <div className="profile-column">
                    <div className="glass-panel profile-card">
                        <div className="profile-header">
                            <div className="avatar">
                                <User size={32} color="var(--accent-primary)" />
                            </div>
                            <div className="profile-info">
                                <h2>User Profile</h2>
                                <span className="font-mono text-secondary">{user.id}</span>
                            </div>
                        </div>

                        <div className="stats-list">
                            <div className="stat-item">
                                <span className="stat-label">Total Orders</span>
                                <span className="stat-value">{user.total_orders}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Total Returns</span>
                                <span className="stat-value">{user.total_returns}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Return Rate</span>
                                <span className="stat-value">{((user.total_returns / user.total_orders) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Avg Return Time</span>
                                <span className="stat-value">{user.avg_return_time_days.toFixed(1)} days</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Explanation & Risk Score */}
                <div className="analysis-column">
                    <div className="glass-panel risk-card">
                        <div className="risk-header">
                            <h3>AI Risk Assessment</h3>
                            {user.is_fraud ? (
                                <span className="badge badge-danger"><AlertTriangle size={14} /> Fraud Flagged</span>
                            ) : (
                                <span className="badge badge-success"><CheckCircle size={14} /> Normal Behavior</span>
                            )}
                        </div>

                        <div className="meter-container">
                            <div className="meter-label">
                                <span>Risk Score</span>
                                <span className="meter-value">{user.risk_score} / 100</span>
                            </div>
                            <div className="meter-track">
                                <div
                                    className={`meter-fill ${user.risk_score > 70 ? 'danger' : user.risk_score > 40 ? 'warning' : 'success'}`}
                                    style={{ width: `${user.risk_score}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="explanation-section">
                            <h4><ShieldAlert size={18} /> Why this user was flagged</h4>
                            <div className="reasons-list">
                                {user.reasons && user.reasons.length > 0 ? (
                                    user.reasons.map((reason, idx) => (
                                        <div key={idx} className="reason-card">
                                            <div className="reason-indicator"></div>
                                            <p>{reason}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="reason-card success">
                                        <CheckCircle size={16} />
                                        <p>No suspicious return behavior detected by the Isolation Forest model.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplanationPage;
