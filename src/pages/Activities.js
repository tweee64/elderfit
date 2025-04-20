import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useUser } from '../contexts/UserContext';
import activities from '../data/activities';

const Activities = () => {
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const { savedActivities, saveActivity, removeActivity } = useUser();
  const colorScheme = getColorScheme();
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all unique categories from activities
  const categories = ['All', ...new Set(activities.map(activity => activity.category))];
  
  // Filter activities based on category and search term
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = categoryFilter === 'All' || activity.category === categoryFilter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.location.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Handle save/remove activity
  const toggleSaveActivity = (activityId) => {
    if (savedActivities.includes(activityId)) {
      removeActivity(activityId);
    } else {
      saveActivity(activityId);
    }
  };

  return (
    <div className={`${colorScheme.bg} min-h-screen`}>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className={`${colorScheme.text} text-3xl font-bold mb-8 ${getTextSizeClass()}`}>
            Discover Nearby Activities
          </h1>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <input
                  type="text"
                  placeholder="Search activities, locations..."
                  className="input-large"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-1/3">
                <select
                  className="input-large"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Activity listing */}
          <div className="space-y-6">
            {filteredActivities.length > 0 ? (
              filteredActivities.map(activity => (
                <div key={activity.id} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-6">
                      <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
                        <span className="text-6xl">{
                          activity.category === "Exercise" ? "🧘‍♂️" :
                          activity.category === "Arts & Crafts" ? "🧶" :
                          activity.category === "Social" ? "🎤" :
                          activity.category === "Educational" ? "📱" :
                          activity.category === "Outdoors" ? "🌱" : "🎯"
                        }</span>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-3/4">
                      <div className="flex justify-between">
                        <h2 className={`${colorScheme.text} text-2xl font-bold mb-2 ${getTextSizeClass()}`}>
                          {activity.title}
                        </h2>
                        <button
                          onClick={() => toggleSaveActivity(activity.id)}
                          className="text-2xl focus:outline-none"
                          aria-label={savedActivities.includes(activity.id) ? "Unsave activity" : "Save activity"}
                        >
                          {savedActivities.includes(activity.id) ? "❤️" : "🤍"}
                        </button>
                      </div>
                      
                      <p className={`${colorScheme.text} mb-3 ${getTextSizeClass()}`}>
                        <strong>When:</strong> {activity.schedule.daysOfWeek.join(', ')} | {activity.schedule.time}
                      </p>
                      
                      <p className={`${colorScheme.text} mb-3 ${getTextSizeClass()}`}>
                        <strong>Where:</strong> {activity.location.name}, {activity.location.address}
                      </p>
                      
                      <p className={`${colorScheme.text} mb-4 ${getTextSizeClass()}`}>
                        {activity.description.length > 150 
                          ? `${activity.description.substring(0, 150)}...` 
                          : activity.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-lg">
                          {activity.category}
                        </span>
                        <span className="bg-elderly-blue bg-opacity-10 text-elderly-blue rounded-full px-3 py-1 text-lg">
                          {activity.currentParticipants}/{activity.maxParticipants} Participants
                        </span>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Link 
                          to={`/activities/${activity.id}`} 
                          className="btn-primary rounded-lg px-6 py-3 text-white"
                        >
                          View Details
                        </Link>
                        <Link 
                          to={`/groups`} 
                          className="btn-secondary rounded-lg px-6 py-3"
                        >
                          Join Group
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className={`${colorScheme.text} text-xl ${getTextSizeClass()}`}>
                  No activities found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;