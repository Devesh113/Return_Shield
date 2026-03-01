import React from 'react';
import { Database, Server, Layers, Cpu, ArrowRight } from 'lucide-react';
import './ArchitecturePage.css';

const ArchitecturePage = () => {
    return (
        <div className="architecture-container animate-fade-in">
            <div className="architecture-header">
                <h1>System Architecture</h1>
                <p className="text-secondary">Understanding the ReturnShield AI Pipeline</p>
            </div>

            <div className="pipeline-section glass-panel">
                <h2>End-to-End Pipeline</h2>
                <div className="pipeline-flow">
                    <PipelineStep
                        icon={<Layers />}
                        title="1. Data Ingestion"
                        desc="Upload transaction logs via CSV to the FastAPI backend."
                    />
                    <ArrowRight className="flow-arrow" />
                    <PipelineStep
                        icon={<Database />}
                        title="2. Feature Engineering"
                        desc="Extract return rates, frequencies, and anomaly markers."
                    />
                    <ArrowRight className="flow-arrow" />
                    <PipelineStep
                        icon={<Cpu />}
                        title="3. ML Model"
                        desc="Isolation Forest algorithm identifies anomalous behavior."
                    />
                    <ArrowRight className="flow-arrow" />
                    <PipelineStep
                        icon={<Server />}
                        title="4. Risk Scoring"
                        desc="Scores generated and explainable reasons extracted."
                    />
                </div>
            </div>

            <div className="tech-stack-section">
                <h2>Technology Stack</h2>
                <div className="tech-grid">
                    <TechCard
                        category="Frontend"
                        techs={['React 18', 'Vite', 'React Router', 'Recharts', 'Vanilla CSS']}
                        color="var(--accent-primary)"
                    />
                    <TechCard
                        category="Backend"
                        techs={['Python 3', 'FastAPI', 'Uvicorn', 'Pydantic']}
                        color="var(--success)"
                    />
                    <TechCard
                        category="Machine Learning"
                        techs={['Scikit-Learn', 'Pandas', 'Isolation Forest Algorithm']}
                        color="var(--warning)"
                    />
                    <TechCard
                        category="Database"
                        techs={['PostgreSQL', 'SQLAlchemy ORM']}
                        color="var(--accent-secondary)"
                    />
                </div>
            </div>
        </div>
    );
};

const PipelineStep = ({ icon, title, desc }) => (
    <div className="pipeline-step">
        <div className="step-icon">{icon}</div>
        <h4>{title}</h4>
        <p className="text-tertiary">{desc}</p>
    </div>
);

const TechCard = ({ category, techs, color }) => (
    <div className="tech-card glass-panel" style={{ '--card-accent': color }}>
        <h3 className="tech-category">{category}</h3>
        <ul className="tech-list">
            {techs.map((tech, idx) => (
                <li key={idx}>
                    <div className="tech-bullet" style={{ backgroundColor: color }}></div>
                    {tech}
                </li>
            ))}
        </ul>
    </div>
);

export default ArchitecturePage;
