import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Requirements from './pages/Requirements.jsx';
import Settings from './pages/Settings.jsx';
import Payment from './pages/Payment.jsx';
import NotFound from './components/ErrorPages/NotFound.jsx';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/requirements/:projectId/*" element={<Requirements />} />
            {/* By creating this route here you are creating two different route cases. <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/settings/payment" element={<Payment />} /> */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
