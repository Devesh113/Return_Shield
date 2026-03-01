import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import ExplanationPage from './pages/ExplanationPage';
import ArchitecturePage from './pages/ArchitecturePage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/user/:userId" element={<ExplanationPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
