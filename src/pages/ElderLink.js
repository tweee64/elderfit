import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const ElderLink = () => {
  const navigate = useNavigate();
  const { getTextSizeClass } = useAccessibility();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationStarted] = useState(false);
  
  // Initialize chat with welcome message only when needed
  useEffect(() => {
    if (!conversationStarted) {
      // Only add the initial bot message (without user message)
      const initialBotMessage = {
        id: 1,
        text: "Hey there! 👋 I'm ElderLink, your friendly event buddy. I can help you find cool events, RSVP, get directions, and more. 🎉 What would you like to know about?",
        sender: "bot",
        timestamp: new Date(),
        options: [
          { id: 'events', text: "Find events" },
          { id: 'whatsapp', text: "WhatsApp groups" },
          { id: 'about', text: "About ElderLink" }
        ],
        showOptions: true
      };
      setMessages([initialBotMessage]);
    }
  }, [conversationStarted]);
  
  // Hard-coded responses for demonstration purposes
  const getBotResponse = (userMessage) => {
    // Convert user message to lowercase for easier matching
    const userText = userMessage.toLowerCase();
    
    if (userText.includes("hello") || userText.includes("hi")) {
      return "Hello! How can I help you today? I can help you find events, join WhatsApp groups, or learn more about ElderLink.";
    }
    else if (userText.includes("find events") || userText.includes("events") || userText.includes("activities")) {
      return "Great! I can help find events in these categories: \n\n🏋️ Physical\n🎵 🎨 Creative\n🧠 Mental\n👥 Social\n\nWhich are you most interested in?";
    }
    else if (userText.includes("creative") || userText.includes("art") || userText.includes("music")) {
      return "Which location would you be interested in participating events in?\nNorth, South, East, or West?";
    }
    else if (userText.includes("west")) {
      return "Here are a few events you might like:\n\n🎨 Painting at xyz Community Centre\n🧶 Beginner's Crocheting class at xyz Community Centre\n✒️ Chinese calligraphy at xyz Community Centre\n\nReply with the number (1, 2, or 3) to learn more.";
    }
    else if (userText === "2" || userText.includes("crocheting")) {
      return "Beginner's Crocheting class at xyz Community Centre!\nWhat would you like to know?\n- Event Details\n- Event Location\n- Event Pricing\n- RSVP info";
    }
    else if (userText.includes("event details") || userText.includes("details")) {
      return "Event Details: Beginner's Crocheting Class\n\n✨ Ready to stitch, relax, and create something cute! Join our Beginner's Crocheting Class!\n\n🧶 You'll learn:\n• How to hold a hook + yarn\n• Basic stitches (chain, single, double)\n• Start your first mini project (like a coaster or flower!)\n\n📍 Location: xyz Community Centre\n💰 Cost: $20 (includes all materials)\n👤 Skill Level: Total beginners welcome!\n☕ Bonus: Free coffee + tea bar\n\n⌚ Time: 19 Apr 2025 - 8PM\n⌚ Time: 26 Apr 2025 - 8PM\n⌚ Time: 3 May 2025 - 8PM\n⌚ Time: 10 May 2025 - 8PM";
    }
    else if (userText.includes("location") || userText.includes("where")) {
      return "xyz Community Centre is at 123 Main St, Singapore, S999999 📍\n\n🗺️ Tap for directions: [Google Maps Link]";
    }
    else if (userText.includes("rsvp") || userText.includes("sign up") || userText.includes("join")) {
      return "Would you like to RSVP for the Beginner's Crocheting Class? I can help you sign up and even invite friends!";
    }
    else if (userText.includes("yes") && messages[messages.length-1].text.includes("RSVP")) {
      return "Would you like to invite a friend to the event?";
    }
    else if (userText.includes("yes") && messages[messages.length-1].text.includes("invite a friend")) {
      return "How many people would you like to invite?";
    }
    else if (userText.includes("1") || userText.includes("2") || userText.includes("3") || userText.includes("one") || userText.includes("two") || userText.includes("three")) {
      if (messages[messages.length-1].text.includes("How many")) {
        return "Awesome, you're gonna love it 😎\nTap the link below to RSVP in the app and share this link with your friends to invite them❤️:\n\n⭐ RSVP Now";
      }
    }
    else if (userText.includes("whatsapp") || userText.includes("group") || userText.includes("chat")) {
      return "Want to chat with other people going to events like Beginner's Crocheting Class?\nI can add you to group chats for various activities!";
    }
    else if (userText.includes("about") || userText.includes("elderlink")) {
      return "ElderLink is a Digital Companion Platform integrated with Healthy 365, designed to help elderly citizens stay connected, active, and healthy through a simple, accessible digital platform. Would you like to know more about our services?";
    }
    else if (userText.includes("thanks") || userText.includes("thank you")) {
      return "You're welcome! Is there anything else I can help with today?";
    }
    else {
      return "I'm not sure I understand. Would you like to:\n- Find events near you\n- Join a WhatsApp group chat\n- Learn more about ElderLink services";
    }
  };
  
  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: "user",
      timestamp: new Date(),
      selected: true
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput('');
    setLoading(true);
    
    // Simulate typing delay before bot responds
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(userInput),
        sender: "bot",
        timestamp: new Date()
      };
      
      // Add appropriate options based on the response
      if (botResponse.text.includes("Which are you most interested in")) {
        botResponse.options = [
          { id: 'physical', text: "🏋️ Physical" },
          { id: 'creative', text: "🎵 🎨 Creative" },
          { id: 'mental', text: "🧠 Mental" },
          { id: 'social', text: "👥 Social" }
        ];
        botResponse.showOptions = true;
      } 
      else if (botResponse.text.includes("Which location")) {
        botResponse.options = [
          { id: 'north', text: "North" },
          { id: 'south', text: "South" },
          { id: 'east', text: "East" },
          { id: 'west', text: "West" }
        ];
        botResponse.showOptions = true;
      }
      else if (botResponse.text.includes("Here are a few events")) {
        botResponse.options = [
          { id: 'option1', text: "1" },
          { id: 'option2', text: "2" },
          { id: 'option3', text: "3" }
        ];
        botResponse.showOptions = true;
      }
      else if (botResponse.text.includes("What would you like to know")) {
        botResponse.options = [
          { id: 'eventDetails', text: "Event Details" },
          { id: 'eventLocation', text: "Event Location" },
          { id: 'eventPricing', text: "Event Pricing" },
          { id: 'rsvp', text: "RSVP info" }
        ];
        botResponse.showOptions = true;
      }
      else if (botResponse.text.includes("Would you like to")) {
        botResponse.options = [
          { id: 'yes', text: "Yes" },
          { id: 'no', text: "No" }
        ];
        botResponse.showOptions = true;
      }
      else if (botResponse.text.includes("How many people")) {
        botResponse.options = [
          { id: 'one', text: "1" },
          { id: 'two', text: "2" },
          { id: 'three', text: "3" }
        ];
        botResponse.showOptions = true;
      }
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setLoading(false);
    }, 1000);
  };
  
  // Function to handle clicking on available options
  const handleOptionClick = (optionText) => {
    // Set the clicked option as the user input and send it
    setUserInput(optionText);
    
    // Use setTimeout to ensure the state update happens before form submission
    setTimeout(() => {
      const form = document.getElementById('message-form');
      if (form) {
        const event = new Event('submit', { cancelable: true });
        form.dispatchEvent(event);
      }
    }, 0);
  };
  
  const handleBack = () => {
    navigate('/about-elderlink');
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  
  // Render chat message bubbles
  const renderMessage = (message) => {
    const isBot = message.sender === 'bot';
    
    return (
      <div key={message.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
        <div className={`rounded-lg py-2 px-4 max-w-[80%] shadow ${
          isBot 
            ? 'bg-white text-black border border-gray-200' 
            : message.selected ? 'bg-green-100 text-gray-800' : 'bg-blue-500 text-white'
        }`}>
          <p className={`text-sm ${getTextSizeClass()}`}>{message.text}</p>
          
          {message.hasMap && (
            <div className="mt-2 text-blue-500 underline">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">Google Maps link</a>
            </div>
          )}
          
          {message.hasRSVPLink && (
            <div className="mt-2">
              <a href="#" className="text-blue-500 font-bold">RSVP Now</a>
            </div>
          )}
          
          {message.hasGroupLink && (
            <div className="mt-2">
              <a href="#" className="text-blue-500 font-bold">Group Chat Link</a>
            </div>
          )}
          
          {message.showOptions && message.options && message.options.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.text)}
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-left text-sm transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-16">
      {/* Header - Light background with ElderLink title */}
      <div className="bg-yellow-400 px-4 py-3 text-gray-800 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-2xl">
            &lt;
          </button>
          <h1 className={`text-xl font-bold ${getTextSizeClass()}`}>ElderLink</h1>
          <div className="text-xl">⋮</div>
        </div>
      </div>
      
      {/* Chat messages container */}
      <div className="px-4 py-6 pb-24 overflow-y-auto" style={{ minHeight: 'calc(100vh - 140px)' }}>
        {messages.map(renderMessage)}
        
        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="bg-white rounded-lg py-2 px-4 max-w-[80%] shadow">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Message input - now functional */}
      <form 
        id="message-form"
        onSubmit={handleSendMessage} 
        className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-2 max-w-md mx-auto"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type a message"
            className="rounded-full bg-gray-100 flex-1 p-2 px-4 focus:outline-none"
          />
          <button 
            type="submit"
            className="ml-2 rounded-full w-10 h-10 bg-yellow-500 flex items-center justify-center"
            disabled={!userInput.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0V9.414a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
      
      {/* Bottom Navigation */}
      <Healthy365Nav />
    </div>
  );
};

export default ElderLink;