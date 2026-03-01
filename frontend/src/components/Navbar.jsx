import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Upload, LayoutDashboard, ShieldCheck } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    <Shield className="logo-icon" />
                    <span className="logo-text">ReturnShield<span className="text-accent">.AI</span></span>
                </NavLink>

                <div className="nav-menu">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/upload" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <Upload size={18} />
                        Upload Data
                    </NavLink>
                    <NavLink to="/architecture" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        <ShieldCheck size={18} />
                        Architecture
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
