import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, AlertTriangle, RefreshCcw, Activity } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import './DashboardPage.css';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
const PIE_COLORS = ['#ef4444', '#10b981']; // Fraud vs Normal

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [suspiciousUsers, setSuspiciousUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, usersRes] = await Promise.all([
                fetch(`https://return-shield-1.onrender.com/api/dashboard/stats`),
                fetch(`https://return-shield-1.onrender.com/api/users/suspicious?limit=10`)
            ]);

            if (statsRes.ok && usersRes.ok) {
                setStats(await statsRes.json());
                setSuspiciousUsers(await usersRes.json());
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading-state">Loading dashboard...</div>;
    }

    if (!stats && !loading) {
        return (
            <div className="empty-state">
                <h2>No data available</h2>
                <p className="text-secondary mb-4">Upload transaction logs to populate the dashboard.</p>
                <Link to="/upload" className="btn btn-primary">Go to Upload</Link>
            </div>
        );
    }

    // Mock data for Line Chart (since we didn't aggregate by time in backend for simplicity)
    // In a real app, this would come from an endpoint
    const timelineData = [
        { name: 'Jan', returns: 40 },
        { name: 'Feb', returns: 30 },
        { name: 'Mar', returns: 45 },
        { name: 'Apr', returns: 90 }, // anomaly
        { name: 'May', returns: 35 },
        { name: 'Jun', returns: 40 },
    ];

    const pieData = [
        { name: 'Fraud/Suspicious', value: stats.high_risk_users },
        { name: 'Normal', value: stats.total_users_analyzed - stats.high_risk_users }
    ];

    return (
        <div className="dashboard-container animate-fade-in">
            <div className="dashboard-header">
                <h1>Fraud Analytics Dashboard</h1>
                <button onClick={fetchDashboardData} className="btn btn-secondary">
                    <RefreshCcw size={16} /> Refresh
                </button>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <KPICard
                    title="Total Users Analyzed"
                    value={stats.total_users_analyzed}
                    icon={<Users size={24} />}
                    color="var(--accent-primary)"
                />
                <KPICard
                    title="High Risk Users"
                    value={stats.high_risk_users}
                    icon={<AlertTriangle size={24} />}
                    color="var(--danger)"
                />
                <KPICard
                    title="Avg Risk Score"
                    value={stats.average_risk_score}
                    icon={<Activity size={24} />}
                    color="var(--accent-secondary)"
                    suffix="/ 100"
                />
            </div>

            {/* Charts Array */}
            <div className="charts-grid">
                {/* Bar Chart */}
                <div className="chart-card glass-panel">
                    <h3>Top High-Risk Users</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={suspiciousUsers.slice(0, 5)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="id" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
                                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="risk_score" fill="var(--danger)" radius={[4, 4, 0, 0]} name="Risk Score" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart */}
                <div className="chart-card glass-panel">
                    <h3>Returns Over Time (Simulated)</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timelineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
                                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                />
                                <Line type="monotone" dataKey="returns" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-primary)' }} name="Total Returns" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="chart-card glass-panel">
                    <h3>User Risk Distribution</h3>
                    <div className="chart-wrapper flex-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pie-legend">
                            <div className="legend-item"><span className="dot" style={{ background: PIE_COLORS[0] }}></span>Fraud ({pieData[0].value})</div>
                            <div className="legend-item"><span className="dot" style={{ background: PIE_COLORS[1] }}></span>Normal ({pieData[1].value})</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="table-container glass-panel">
                <div className="table-header-row">
                    <h3>Suspicious Users Identified</h3>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Total Orders</th>
                                <th>Total Returns</th>
                                <th>Return Rate</th>
                                <th>Avg. Return Time</th>
                                <th>Risk Score</th>
                                <th>Fraud Flag</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suspiciousUsers.map((user) => (
                                <tr key={user.id} className={user.is_fraud ? "row-danger" : ""}>
                                    <td className="font-mono">{user.id.length > 8 ? `${user.id.substring(0, 8)}...` : user.id}</td>
                                    <td>{user.total_orders}</td>
                                    <td>{user.total_returns}</td>
                                    <td>{((user.total_returns / user.total_orders) * 100).toFixed(1)}%</td>
                                    <td>{user.avg_return_time_days.toFixed(1)} days</td>
                                    <td>
                                        <span className={`score-badge ${user.risk_score > 70 ? 'high' : user.risk_score > 40 ? 'med' : 'low'}`}>
                                            {user.risk_score}
                                        </span>
                                    </td>
                                    <td>
                                        {user.is_fraud ? <span className="flag-yes">Yes</span> : <span className="flag-no">No</span>}
                                    </td>
                                    <td>
                                        <Link to={`/user/${user.id}`} className="link-action">Explain</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const KPICard = ({ title, value, icon, color, suffix = "" }) => (
    <div className="kpi-card glass-panel" style={{ '--card-color': color }}>
        <div className="kpi-header">
            <h4 className="kpi-title">{title}</h4>
            <div className="kpi-icon" style={{ color: color }}>
                {icon}
            </div>
        </div>
        <div className="kpi-value">
            {value} <span className="kpi-suffix">{suffix}</span>
        </div>
    </div>
);

export default DashboardPage;
