import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import events from '../data/events'; // Import events data

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventId = parseInt(id);
  
  // First look for matching event in the data from data/events.js
  const findEventFromEventsData = () => {
    return events.find(event => event.id === eventId);
  };
  
  // Get all events from across all days from the Events.js data
  const getAllEventsFromDays = () => {
    // Import the allEvents structure from our events data
    const allEvents = {
      Today: [
        {
          id: 1,
          timeStart: '11.45am',
          timeEnd: '12.45pm',
          program: 'Sunrise In The City (SITC)',
          title: 'GetFit @ ImpactFit',
          location: 'JURONG WEST, SJ Campus - Impact Fit',
          slots: 5,
          intensity: 1,
          virtual: false,
          recommended: true,
          date: 'Monday 21 Apr',
          directions: 'After enter from main entrance, proceed along the main corridor, after the foodcourt on your right hand side, lookout for the gym on your right.',
          description: 'GetFit Programme aim to cultivate a movement towards personal responsibility in Fitness and Wellness. Within each session, a series of strength and mobility enhancing exercises will be conducted to promote physical fitness, while participants will also gain insights on exercise programming and the pillars of movement.',
          note: 'We kindly request registered participants to arrive on time. Latecomers and walk-ins will be admitted if capacity allows.',
          organiser: 'SJD & TRUE Group',
          phone: '87498775',
          email: 'sjd.hpb23@gmail.com',
        },
        {
          id: 104,
          timeStart: '12pm',
          timeEnd: '1pm',
          program: 'Healthy Workplace Ecosystem (HWE)',
          title: 'Dance Remix',
          location: 'Zoom, Virtual Event',
          virtual: true,
          intensity: 1,
          recommended: false
        },
        {
          id: 3,
          timeStart: '12pm',
          timeEnd: '12.45pm',
          program: 'Healthy Workplace Ecosystem (HWE)',
          title: 'Gentle Yoga',
          location: 'BOON KENG, 80 Bendemeer Road - #09-01',
          virtual: false,
          intensity: 1,
          recommended: true
        },
        {
          id: 4,
          timeStart: '12pm',
          timeEnd: '1pm',
          program: 'Healthy Workplace Ecosystem (HWE)',
          title: 'Work Great - Dance Remix',
          location: 'Zoom, Virtual Event',
          virtual: true,
          intensity: 1,
          recommended: false
        },
        {
          id: 5,
          timeStart: '12.30pm',
          timeEnd: '1.30pm',
          program: 'Sunrise In The City (SITC)',
          title: 'Back, Neck & Shoulder (Platinum Yoga @ Westgate)',
          location: 'WESTGATE, 3 Gateway Drive',
          virtual: false,
          intensity: 2,
          recommended: true
        }
      ],
      Tomorrow: [
        {
          id: 6,
          timeStart: '9am',
          timeEnd: '10am',
          program: 'Sunrise In The City (SITC)',
          title: 'Morning Tai Chi',
          location: 'MARINE PARADE, Community Center',
          slots: 3,
          intensity: 1,
          virtual: false,
          recommended: true
        },
        {
          id: 7,
          timeStart: '11am',
          timeEnd: '12pm',
          program: 'Healthy Workplace Ecosystem (HWE)',
          title: 'Senior Fitness',
          location: 'TAMPINES, Tampines Hub',
          slots: 2,
          intensity: 2,
          virtual: false,
          recommended: true
        }
      ],
      'Wed, Apr 23': [
        {
          id: 8,
          timeStart: '3pm',
          timeEnd: '4pm',
          program: 'Active Health',
          title: 'Pilates for Beginners',
          location: 'Zoom, Virtual Event',
          virtual: true,
          intensity: 2,
          recommended: false
        }
      ],
      'Thu, Apr 24': [
        {
          id: 9,
          timeStart: '5pm',
          timeEnd: '6pm',
          program: 'Sunrise In The City (SITC)',
          title: 'Evening Stretch',
          location: 'CLEMENTI, Clementi Mall',
          slots: 8,
          intensity: 1,
          virtual: false,
          recommended: false
        }
      ],
      'Fri, Apr 25': [
        {
          id: 10,
          timeStart: '4.30pm',
          timeEnd: '5.30pm',
          program: 'Active Health',
          title: 'HIIT Workout',
          location: 'PUNGGOL, Waterway Point',
          slots: 4,
          intensity: 3,
          virtual: false,
          recommended: true
        }
      ]
    };
    
    // Search through all days
    let allEventsFlattened = [];
    
    for (const day in allEvents) {
      allEventsFlattened = [...allEventsFlattened, ...allEvents[day]];
    }
    
    return allEventsFlattened;
  };
  
  // Find event from all available events
  const allPossibleEvents = getAllEventsFromDays();
  const foundEvent = allPossibleEvents.find(event => event.id === eventId) || findEventFromEventsData();
  
  // If no event is found, create a fallback
  const event = foundEvent || {
    id: eventId,
    program: 'Sample Program',
    title: 'Event Not Found',
    slots: 0,
    date: 'Date not available',
    timeStart: 'Time not',
    timeEnd: 'available',
    location: 'Location not available',
    directions: 'No directions available',
    description: 'This event could not be found in our database.',
    note: '',
    intensity: 1,
    organiser: 'Unknown',
    phone: '-',
    email: '-',
    virtual: false,
  };
  
  // const { getTextSizeClass } = useAccessibility();
  
  // Handle going back
  const handleBack = () => {
    navigate('/events');
  };

  // Generate event time display
  const getEventTimeDisplay = () => {
    // For events from events.js that have a schedule
    if (foundEvent && foundEvent.schedule) {
      const { daysOfWeek, time } = foundEvent.schedule;
      return `${daysOfWeek.join(', ')}, ${time}`;
    }
    
    // For events from Events.js component with timeStart and timeEnd
    return `${event.date || 'Date not available'}, ${event.timeStart || ''} - ${event.timeEnd || ''}`;
  };

  // Generate location display
  const getLocationDisplay = () => {
    // For events from events.js that have a location object
    if (foundEvent && foundEvent.location && typeof foundEvent.location === 'object') {
      return foundEvent.location.name;
    }
    
    // For events from Events.js component with location string
    return event.location;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header - Yellow background */}
      <div className="bg-yellow-400 px-4 py-6 text-gray-800">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-2xl">
            &lt;
          </button>
          <h1 className="text-2xl font-bold">Event Details</h1>
          <div className="w-5"></div> {/* Empty div for alignment */}
        </div>
      </div>
      
      {/* Action buttons - Directions and Book now */}
      <div className="flex bg-white">
        <button className="flex-1 py-4 text-blue-500 font-medium border-r border-gray-200 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          Directions
        </button>
        <button className="flex-1 py-4 text-blue-500 font-medium flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Book now
        </button>
      </div>
      
      {/* Event Description - First screenshot section */}
      <div className="p-6 bg-white">
        <p className="text-gray-700">
          {event.description}
        </p>
        
        {event.note && (
          <p className="text-gray-700 mt-6">
            {event.note}
          </p>
        )}
      </div>

      {/* Event illustration image - Second screenshot */}
      <div className="bg-blue-500">
        <img 
          src={foundEvent?.imageUrl || "/images/taichi.jpeg"}
          alt="Event illustration"
          className="w-full h-64 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400' preserveAspectRatio='none'%3E%3Crect fill='%234299e1' width='800' height='400'/%3E%3Cg fill='%23FFFFFF'%3E%3Ccircle cx='200' cy='200' r='70'/%3E%3Ccircle cx='500' cy='200' r='70'/%3E%3C/g%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Event Info - Second screenshot section */}
      <div className="bg-white p-6">
        <div className="flex items-center">
          <p className="text-gray-600 text-sm">{event.program}</p>
          {event.slots && event.slots > 0 && (
            <div className="ml-auto bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
              {event.slots} SLOTS LEFT
            </div>
          )}
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mt-2">{event.title}</h2>
        
        {/* When section */}
        <div className="mt-6 flex">
          <div className="w-24">
            <h3 className="text-gray-500 uppercase text-sm font-medium">WHEN</h3>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium">{getEventTimeDisplay()}</p>
          </div>
        </div>
        
        {/* Where section */}
        <div className="mt-6 flex">
          <div className="w-24">
            <h3 className="text-gray-500 uppercase text-sm font-medium">WHERE</h3>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium">{getLocationDisplay()}</p>
            <div className="mt-1 flex items-center justify-end">
              <span className="text-gray-600 mr-2 text-sm">Intensity:</span>
              <div className="flex space-x-1">
                <div className={`h-2 w-5 rounded ${event.intensity >= 1 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                <div className={`h-2 w-5 rounded ${event.intensity >= 2 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                <div className={`h-2 w-5 rounded ${event.intensity >= 3 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* About this event section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">About this event</h2>
        <p className="text-gray-700">
          {event.description}
        </p>
        
        {/* How to get there section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to get there</h2>
        <p className="text-gray-700">
          {event.directions || (foundEvent?.location?.address || 'No directions available')}
        </p>
        <button className="text-blue-500 font-medium mt-2">Directions</button>
        
        {/* Organiser section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Organiser</h2>
        <p className="text-gray-800">{event.organiser || foundEvent?.host || 'Unknown'}</p>
        
        {/* Contact info */}
        <div className="mt-6">
          <a href={`tel:${event.phone || foundEvent?.contact || ''}`} className="flex items-center text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {event.phone || foundEvent?.contact || 'N/A'}
          </a>
          <a href={`mailto:${event.email || ''}`} className="flex items-center text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            {event.email || 'N/A'}
          </a>
          <button className="flex items-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Event Terms
          </button>
        </div>
        
        {/* Accessibility info if available */}
        {foundEvent && foundEvent.accessibility && foundEvent.accessibility.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Accessibility</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {foundEvent.accessibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}
        
        {/* Equipment info if available */}
        {foundEvent && foundEvent.equipment && foundEvent.equipment.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What to bring</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {foundEvent.equipment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      
      {/* Fixed bottom Book now button */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white py-4 text-center font-bold text-lg">
        Book now
      </div>
      
      {/* Bottom space to prevent content from being hidden behind the fixed button */}
      <div className="h-20"></div>
    </div>
  );
};

export default EventDetail;