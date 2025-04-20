import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useUser } from '../contexts/UserContext';
import activities from '../data/activities';

const ActivityDetail = () => {
  const { id } = useParams();
  const activityId = parseInt(id);
  const activity = activities.find(a => a.id === activityId);
  
  const { getTextSizeClass, getColorScheme } = useAccessibility();
  const { savedActivities, saveActivity, removeActivity, joinGroup } = useUser();
  const colorScheme = getColorScheme();
  
  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className={`${colorScheme.text} text-2xl font-bold ${getTextSizeClass()}`}>Activity not found</h2>
          <p className={`${colorScheme.text} mt-4 ${getTextSizeClass()}`}>
            The activity you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/activities" className="btn-primary mt-6 inline-block">
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }
  
  // Handle save/remove activity
  const toggleSaveActivity = () => {
    if (savedActivities.includes(activityId)) {
      removeActivity(activityId);
    } else {
      saveActivity(activityId);
    }
  };
  
  // Handle join group for this activity
  const handleJoinGroup = () => {
    joinGroup(activityId);
  };

  return (
    <div className={`${colorScheme.bg} min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        <Link to="/activities" className={`flex items-center ${colorScheme.text} ${getTextSizeClass()} mb-6`}>
          ← Back to Activities
        </Link>
        
        <div className="card">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8">
              <div className="bg-gray-200 h-60 rounded-lg flex items-center justify-center">
                <span className="text-8xl">{
                  activity.category === "Exercise" ? "🧘‍♂️" :
                  activity.category === "Arts & Crafts" ? "🧶" :
                  activity.category === "Social" ? "🎤" :
                  activity.category === "Educational" ? "📱" :
                  activity.category === "Outdoors" ? "🌱" : "🎯"
                }</span>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={toggleSaveActivity}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center text-lg ${
                    savedActivities.includes(activityId) 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {savedActivities.includes(activityId) 
                    ? "❤️ Saved to Favorites" 
                    : "🤍 Add to Favorites"}
                </button>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={handleJoinGroup}
                  className="w-full btn-primary py-3 px-4 rounded-lg"
                >
                  Join Activity Group
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <h1 className={`${colorScheme.text} text-3xl font-bold ${getTextSizeClass()}`}>
                  {activity.title}
                </h1>
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-1 text-lg">
                  {activity.category}
                </span>
              </div>
              
              <div className="bg-elderly-blue bg-opacity-10 rounded-lg p-4 mb-6">
                <h2 className={`${colorScheme.text} text-xl font-semibold mb-2 ${getTextSizeClass()}`}>
                  When & Where
                </h2>
                <p className={`${colorScheme.text} mb-2 ${getTextSizeClass()}`}>
                  <strong>Schedule:</strong> {activity.schedule.daysOfWeek.join(', ')} | {activity.schedule.time}
                </p>
                <p className={`${colorScheme.text} mb-2 ${getTextSizeClass()}`}>
                  <strong>Dates:</strong> {new Date(activity.schedule.startDate).toLocaleDateString()} - {new Date(activity.schedule.endDate).toLocaleDateString()}
                </p>
                <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                  <strong>Location:</strong> {activity.location.name}, {activity.location.address}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className={`${colorScheme.text} text-xl font-semibold mb-2 ${getTextSizeClass()}`}>
                  About This Activity
                </h2>
                <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                  {activity.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className={`${colorScheme.text} text-xl font-semibold mb-2 ${getTextSizeClass()}`}>
                  Hosted By
                </h2>
                <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                  {activity.host}
                </p>
                <p className={`${colorScheme.text} ${getTextSizeClass()}`}>
                  Contact: {activity.contact}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className={`${colorScheme.text} text-xl font-semibold mb-2 ${getTextSizeClass()}`}>
                  Participant Information
                </h2>
                <div className="bg-elderly-blue bg-opacity-10 text-elderly-blue rounded-full px-4 py-2 text-lg inline-block">
                  {activity.currentParticipants}/{activity.maxParticipants} Participants
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className={`${colorScheme.text} text-xl font-semibold mb-2 ${getTextSizeClass()}`}>
                  Accessibility
                </h2>
                <div className="flex flex-wrap gap-2">
                  {activity.accessibility.map((item, index) => (
                    <span key={index} className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-lg">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className={`${colorScheme.text} text-xl font-semibold mb-2 ${getTextSizeClass()}`}>
                  What to Bring
                </h2>
                <ul className="list-disc pl-5">
                  {activity.equipment.map((item, index) => (
                    <li key={index} className={`${colorScheme.text} ${getTextSizeClass()} mb-1`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;