import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import context providers
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { UserProvider } from './contexts/UserContext';

// Import pages
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Groups from './pages/Groups';
import WhatsApp from './pages/WhatsApp';
import Healthy365 from './pages/Healthy365';
import Explore from './pages/Explore';
import ElderLink from './pages/ElderLink';
import ElderlyRewards from './pages/ElderlyRewards';
import AboutElderLink from './pages/AboutElderLink';

function App() {
  return (
    <AccessibilityProvider>
      <UserProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Healthy365 />} />
                {/* <Route path="/home" element={<Home />} /> */}
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/whatsapp" element={<WhatsApp />} />
                <Route path="/elderlink" element={<ElderLink />} />
                <Route path="/about-elderlink" element={<AboutElderLink />} />
                <Route path="/rewards" element={<ElderlyRewards />} />
                <Route path="/healthy365" element={<Navigate to="/" replace />} />
                <Route path="/explore" element={<Explore />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
          </div>
        </Router>
      </UserProvider>
    </AccessibilityProvider>
  );
}

export default App;
