import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useUser } from '../contexts/UserContext';

const Home = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const { currentUser } = useUser();
  const colorScheme = getColorScheme();

  // Feature cards for the three main features
  const features = [
    {
      title: "Discover Nearby Events",
      description: "Find events happening near you that match your interests and abilities.",
      icon: "🔍",
      link: "/events",
      color: "bg-elderly-blue"
    },
    {
      title: "Join Groups & Make Friends",
      description: "Participate in group events and make meaningful connections with others.",
      icon: "👥",
      link: "/groups",
      color: "bg-elderly-teal"
    },
    {
      title: "WhatsApp Announcements",
      description: "Get timely updates about events and groups through WhatsApp.",
      icon: "💬",
      link: "/whatsapp",
      color: "bg-elderly-orange"
    }
  ];

  return (
    <div className={`${colorScheme.bg} min-h-screen`}>
      {/* Hero section with welcome message */}
      <section className={`py-8 md:py-12 ${colorScheme.bg}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className={`${colorScheme.text} text-4xl md:text-5xl font-bold mb-6 ${getTextSizeClass()}`}>
              Welcome to ElderFit, {currentUser.name}!
            </h1>
            <p className={`${colorScheme.text} text-xl mb-8 max-w-3xl mx-auto ${getTextSizeClass()}`}>
              Your digital companion for staying active, connected, and engaged with your community.
            </p>
          </div>

          {/* Healthy365 integration banner */}
          <div className="bg-elderly-blue text-white rounded-xl p-6 mb-10 shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <span className="text-4xl">📱</span>
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${getTextSizeClass()}`}>
                  Connected with Healthy365
                </h2>
                <p className={`${getTextSizeClass()}`}>
                  Your daily steps: <strong>{currentUser.healthy365Data.dailySteps.toLocaleString()}</strong> | 
                  Weekly average: <strong>{currentUser.healthy365Data.weeklyAverage.toLocaleString()}</strong>
                </p>
                <div className="mt-2">
                  <Link to="/profile" className="text-white underline">
                    View your health profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured sections */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className={`${colorScheme.text} text-3xl font-bold mb-8 text-center ${getTextSizeClass()}`}>
            What would you like to do today?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card hover:shadow-lg transition-shadow duration-300 border-t-4 ${feature.color}`}
              >
                <div className="text-center">
                  <span className="text-5xl mb-4 inline-block">{feature.icon}</span>
                  <h3 className={`${colorScheme.text} text-2xl font-bold mb-3 ${getTextSizeClass()}`}>
                    {feature.title}
                  </h3>
                  <p className={`${colorScheme.text} mb-6 ${getTextSizeClass()}`}>
                    {feature.description}
                  </p>
                  <Link 
                    to={feature.link} 
                    className="btn-primary rounded-lg px-6 py-3 text-white inline-block"
                  >
                    Explore Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`${colorScheme.text} text-3xl font-bold ${getTextSizeClass()}`}>
              Your Upcoming Events
            </h2>
            <Link 
              to="/events" 
              className={`${colorScheme.text} underline ${getTextSizeClass()}`}
            >
              View All →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-start">
              <div className="bg-elderly-teal text-white rounded-lg p-3 mr-4 text-center min-w-16">
                <div className="text-sm font-bold">APR</div>
                <div className="text-2xl font-bold">22</div>
              </div>
              <div>
                <h3 className={`${colorScheme.text} text-xl font-semibold mb-1 ${getTextSizeClass()}`}>
                  Morning Tai Chi Session
                </h3>
                <p className={`${colorScheme.text} mb-2 ${getTextSizeClass()}`}>
                  08:00 AM - 09:00 AM | Bishan Community Centre
                </p>
                <div className="flex">
                  <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm mr-2">
                    Exercise
                  </span>
                  <span className="bg-elderly-blue bg-opacity-10 text-elderly-blue rounded-full px-3 py-1 text-sm">
                    8/15 Participants
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="bg-elderly-orange text-white rounded-lg p-3 mr-4 text-center min-w-16">
                <div className="text-sm font-bold">APR</div>
                <div className="text-2xl font-bold">25</div>
              </div>
              <div>
                <h3 className={`${colorScheme.text} text-xl font-semibold mb-1 ${getTextSizeClass()}`}>
                  Beginner's Crocheting Class
                </h3>
                <p className={`${colorScheme.text} mb-2 ${getTextSizeClass()}`}>
                  10:00 AM - 12:00 PM | Toa Payoh Community Club
                </p>
                <div className="flex">
                  <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm mr-2">
                    Arts & Crafts
                  </span>
                  <span className="bg-elderly-blue bg-opacity-10 text-elderly-blue rounded-full px-3 py-1 text-sm">
                    7/12 Participants
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;