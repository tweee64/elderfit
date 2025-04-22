import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import Healthy365Nav from '../components/common/Healthy365Nav';

const ElderLink = () => {
  const navigate = useNavigate();
  const { getTextSizeClass } = useAccessibility();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initialize chat with welcome message only
  useEffect(() => {
    if (!conversationStarted) {
      // Initial bot message
      const initialBotMessage = {
        id: 1,
        text: "Hello there! 👋 I'm ElderLink, your friendly event buddy. How can I assist you today?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages([initialBotMessage]);
      setConversationStarted(true);
    }
  }, [conversationStarted]);
  
  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput('');
    setLoading(true);
    
    // Determine response based on conversation flow
    let botResponseText = "";
    let showOptions = false;
    let options = [];
    
    // Check for predefined conversation flow
    if (messages.length === 1 && messages[0].sender === "bot" && messages[0].text.includes("How can I assist you today")) {
      botResponseText = "Of course! I'd be happy to help. Which activity are you referring to?";
    } 
    else if (messages.length === 3 && userInput.toLowerCase().includes("gardening")) {
      botResponseText = "Ah yes, the Community Gardening Workshop! It's a relaxing session where you can learn about growing herbs and vegetables. It's suitable for all levels, even if you're just starting out.";
    }
    else if (messages.length === 5 && userInput.toLowerCase().includes("lovely")) {
      botResponseText = "It will take place at the Meadowbrook Community Centre, on Maple Lane. That's the same place where the craft fair was last month.";
    }
    else if (messages.length === 7 && userInput.toLowerCase().includes("transport")) {
      botResponseText = "You can take Bus 52 from Main Street, and it'll drop you right in front of the centre. The stop is called Maple Lane Community Stop.";
    }
    else if (messages.length === 9 && userInput.toLowerCase().includes("indoors")) {
      botResponseText = "It's partly indoors and partly outside in their little garden. The first half is a short talk inside, and then they'll guide everyone to the garden to do some planting.";
    }
    else if (messages.length === 11 && userInput.toLowerCase().includes("assistance")) {
      botResponseText = "Yes! There will be volunteers and staff around the whole time, and they're more than happy to help. If you'd like, I can also reserve you a seat near the front.";
    }
    else if (messages.length === 13 && (userInput.toLowerCase().includes("thank") || userInput.toLowerCase().includes("wonderful"))) {
      botResponseText = "You're very welcome! I've made a note for you. If you need help getting ready for the day or reminders, just let me know. 🌸";
    }
    else {
      // Default response for any other inputs
      botResponseText = "I'm here to help with any questions about activities and events. Is there anything specific you'd like to know?";
    }
    
    // Simulate typing delay before bot responds
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
        showOptions,
        options
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setLoading(false);
    }, 1000);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Render chat message bubbles
  const renderMessage = (message) => {
    const isBot = message.sender === 'bot';
    
    return (
      <div key={message.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
        <div className={`rounded-lg py-2 px-4 max-w-[80%] shadow ${
          isBot 
            ? 'bg-white text-black border border-gray-200' 
            : 'bg-blue-500 text-white'
        }`}>
          {isBot && <span className="text-xs text-gray-500 mb-1">🤖 Chatbot</span>}
          {!isBot && <span className="text-xs text-blue-300 mb-1">👵 Elderly User</span>}
          <p className={`text-sm ${getTextSizeClass()} whitespace-pre-line`}>{message.text}</p>
          
          {message.timestamp && (
            <div className="text-xs text-gray-500 mt-1 text-right">
              {formatTime(message.timestamp)}
            </div>
          )}
          
          {message.showOptions && message.options && message.options.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => setUserInput(option.text)}
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

  // Function to set predefined conversation for demo purposes

  // eslint-disable-next-line 
  const loadPresetConversation = () => {
    const presetConversation = [
      {
        id: 1,
        text: "Hello there! 👋 I'm ElderLink, your friendly event buddy. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 10)
      },
      {
        id: 2,
        text: "Hello dear, I saw there's an activity listed for next week. Could you tell me a bit more about it?",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 9)
      },
      {
        id: 3,
        text: "Of course! I'd be happy to help. Which activity are you referring to?",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 8)
      },
      {
        id: 4,
        text: "I think it was something about a gardening workshop. It sounded nice.",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 7)
      },
      {
        id: 5,
        text: "Ah yes, the Community Gardening Workshop! It's a relaxing session where you can learn about growing herbs and vegetables. It's suitable for all levels, even if you're just starting out.",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 6)
      },
      {
        id: 6,
        text: "That sounds lovely. Where will it be held?",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 5)
      },
      {
        id: 7,
        text: "It will take place at the Meadowbrook Community Centre, on Maple Lane. That's the same place where the craft fair was last month.",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 4)
      },
      {
        id: 8,
        text: "Oh, I remember that place. How would I get there by public transport?",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 3)
      },
      {
        id: 9,
        text: "You can take Bus 52 from Main Street, and it'll drop you right in front of the centre. The stop is called Maple Lane Community Stop.",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 2)
      },
      {
        id: 10,
        text: "Perfect. And what type of activity is this? Is it indoors?",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 1)
      },
      {
        id: 11,
        text: "It's partly indoors and partly outside in their little garden. The first half is a short talk inside, and then they'll guide everyone to the garden to do some planting.",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 50)
      },
      {
        id: 12,
        text: "That sounds just right for me. Will there be someone to help if I need assistance?",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 40)
      },
      {
        id: 13,
        text: "Yes! There will be volunteers and staff around the whole time, and they're more than happy to help. If you'd like, I can also reserve you a seat near the front.",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 30)
      },
      {
        id: 14,
        text: "Yes, please. That would be wonderful. Thank you so much!",
        sender: "user",
        timestamp: new Date(new Date().getTime() - 1000 * 20)
      },
      {
        id: 15,
        text: "You're very welcome! I've made a note for you. If you need help getting ready for the day or reminders, just let me know. 🌸",
        sender: "bot",
        timestamp: new Date(new Date().getTime() - 1000 * 10)
      }
    ];
    
    setMessages(presetConversation);
    scrollToBottom();
  };

  // Load preset conversation for demo purposes
  useEffect(() => {
    if (conversationStarted) {
      loadPresetConversation();
    }
// eslint-disable-next-line
  }, [conversationStarted]);

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6 text-center">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-4"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className={`text-2xl font-bold ${getTextSizeClass()} mx-auto`}>ElderLink</h1>
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
        
        {/* Empty div for auto-scroll reference */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
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