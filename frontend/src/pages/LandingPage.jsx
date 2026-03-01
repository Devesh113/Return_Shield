import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Activity, Users, Clock, FileText } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">Next-Generation Protection</div>
                    <h1 className="hero-title">
                        ReturnShield <span className="text-gradient-accent">AI</span>
                    </h1>
                    <h2 className="hero-subtitle">
                        Explainable Returns Fraud Detection
                    </h2>
                    <p className="hero-description">
                        AI-powered dashboard to detect suspicious return behavior in e-commerce.
                        Stop wardrobing, receipt manipulation, and serial returners instantly.
                    </p>

                    <div className="hero-actions">
                        <Link to="/upload" className="btn btn-primary btn-large">
                            Upload Transactions
                        </Link>
                        <Link to="/dashboard" className="btn btn-secondary btn-large">
                            View Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>AI-Powered Detection Capabilities</h2>
                    <p className="text-secondary">Comprehensive protection against all forms of return fraud.</p>
                </div>

                <div className="features-grid">
                    <FeatureCard
                        icon={<Users className="feature-icon" />}
                        title="Serial Returner Detection"
                        description="Identify users with abnormally high return frequencies across multiple orders."
                    />
                    <FeatureCard
                        icon={<Clock className="feature-icon" />}
                        title="Wardrobing Behavior"
                        description="Detect ultra-short return windows indicative of buying to wear once and return."
                    />
                    <FeatureCard
                        icon={<Activity className="feature-icon" />}
                        title="Timing Anomalies"
                        description="Spot statistically significant deviations in purchase-return timing patterns."
                    />
                    <FeatureCard
                        icon={<FileText className="feature-icon" />}
                        title="Receipt Manipulation"
                        description="Automatically flag occurrences of multiple returns using the same receipt ID."
                    />
                    <FeatureCard
                        icon={<ShieldAlert className="feature-icon" />}
                        title="Explainable Risk Scores"
                        description="Don't just identify fraud. Understand exactly why a user was flagged with clear explanations."
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card glass-panel">
        <div className="feature-icon-wrapper">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description text-secondary">{description}</p>
    </div>
);

export default LandingPage;
