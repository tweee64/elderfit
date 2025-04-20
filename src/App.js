import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import context providers
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { UserProvider } from './contexts/UserContext';

// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import pages
import Home from './pages/Home';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Groups from './pages/Groups';
import WhatsApp from './pages/WhatsApp';

function App() {
  return (
    <AccessibilityProvider>
      <UserProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/whatsapp" element={<WhatsApp />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </AccessibilityProvider>
  );
}

export default App;
