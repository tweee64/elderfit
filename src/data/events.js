// Mock event data for ElderFit application
const events = [
  {
    id: 1,
    title: "Morning Tai Chi Session",
    description: "Join us for a gentle morning Tai Chi class suitable for all levels. This ancient Chinese practice helps improve balance, flexibility, and mental well-being.",
    category: "Exercise",
    location: {
      name: "Bishan Community Centre",
      address: "51 Bishan Street 13, Singapore 579799",
      coordinates: { lat: 1.3505, lng: 103.8476 }
    },
    schedule: {
      startDate: "2025-04-22",
      endDate: "2025-05-20",
      daysOfWeek: ["Tuesday", "Thursday"],
      time: "08:00 AM - 09:00 AM"
    },
    host: "Singapore Seniors Exercise Network",
    contact: "+65 9123 4567",
    maxParticipants: 15,
    currentParticipants: 8,
    accessibility: ["Wheelchair accessible", "No stairs", "Seating available"],
    equipment: ["Comfortable clothes", "Water bottle"],
    imageUrl: "/images/taichi.jpeg"
  },
  {
    id: 2,
    title: "Beginner's Crocheting Class",
    description: "Learn the basics of crocheting in this beginner-friendly class. Create beautiful handmade items while enjoying social time with others.",
    category: "Arts & Crafts",
    location: {
      name: "Toa Payoh Community Club",
      address: "93 Toa Payoh Lorong 4, Singapore 310093",
      coordinates: { lat: 1.3329, lng: 103.8485 }
    },
    schedule: {
      startDate: "2025-04-25",
      endDate: "2025-05-30",
      daysOfWeek: ["Friday"],
      time: "10:00 AM - 12:00 PM"
    },
    host: "Silver Arts Singapore",
    contact: "+65 8234 5678",
    maxParticipants: 12,
    currentParticipants: 7,
    accessibility: ["Wheelchair accessible", "Well-lit room"],
    equipment: ["Crochet hooks provided", "Yarn provided for first session"],
    imageUrl: "/images/crocheting.jpg"
  },
  {
    id: 3,
    title: "Karaoke Social",
    description: "Come sing your favorite songs in a fun, supportive environment. No singing experience needed - just enthusiasm!",
    category: "Social",
    location: {
      name: "Ang Mo Kio Community Centre",
      address: "795 Ang Mo Kio Ave 1, Singapore 569976",
      coordinates: { lat: 1.3691, lng: 103.8454 }
    },
    schedule: {
      startDate: "2025-04-21",
      endDate: "2025-06-30",
      daysOfWeek: ["Monday"],
      time: "03:00 PM - 05:00 PM"
    },
    host: "Silver Voices Club",
    contact: "+65 9345 6789",
    maxParticipants: 20,
    currentParticipants: 16,
    accessibility: ["Wheelchair accessible", "Microphone with adjustable height"],
    equipment: ["Song requests welcome", "Refreshments provided"],
    imageUrl: "https://images.unsplash.com/photo-1605723517503-3ffdb67d300f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Digital Skills Workshop",
    description: "Learn essential smartphone skills, including how to use WhatsApp, make video calls, and use health apps like Healthy365.",
    category: "Educational",
    location: {
      name: "Woodlands Community Club",
      address: "1 Woodlands Street 81, Singapore 738526",
      coordinates: { lat: 1.4382, lng: 103.7890 }
    },
    schedule: {
      startDate: "2025-04-23",
      endDate: "2025-05-14",
      daysOfWeek: ["Wednesday"],
      time: "09:30 AM - 11:30 AM"
    },
    host: "DigitalForSeniors",
    contact: "+65 8456 7890",
    maxParticipants: 15,
    currentParticipants: 11,
    accessibility: ["Wheelchair accessible", "Devices provided if needed"],
    equipment: ["Smartphone (if you have one)", "Reading glasses if required"],
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Gentle Yoga for Seniors",
    description: "A gentle yoga practice designed specifically for seniors to improve flexibility, balance and relaxation.",
    category: "Exercise",
    location: {
      name: "Tampines Community Club",
      address: "2 Tampines Street 41, Singapore 529204",
      coordinates: { lat: 1.3520, lng: 103.9530 }
    },
    schedule: {
      startDate: "2025-04-24",
      endDate: "2025-06-26",
      daysOfWeek: ["Thursday"],
      time: "09:00 AM - 10:00 AM"
    },
    host: "SilverYoga",
    contact: "+65 9567 8901",
    maxParticipants: 12,
    currentParticipants: 9,
    accessibility: ["Chairs available", "No need to get on the floor", "Modifications for all poses"],
    equipment: ["Comfortable clothes", "Yoga mat (provided if needed)"],
    imageUrl: "/images/yoga.jpg"
  },
  {
    id: 6,
    title: "Community Garden Club",
    description: "Join fellow gardening enthusiasts to tend our community garden. Learn about sustainable gardening practices and grow vegetables together.",
    category: "Outdoors",
    location: {
      name: "Jurong Central Park",
      address: "Jalan Boon Lay, Singapore 619961",
      coordinates: { lat: 1.3397, lng: 103.7067 }
    },
    schedule: {
      startDate: "2025-04-22",
      endDate: "2025-07-29",
      daysOfWeek: ["Tuesday", "Saturday"],
      time: "08:00 AM - 09:30 AM"
    },
    host: "Green Thumbs Society",
    contact: "+65 8678 9012",
    maxParticipants: 20,
    currentParticipants: 14,
    accessibility: ["Some paths are wheelchair accessible", "Raised garden beds available"],
    equipment: ["Hat", "Sunscreen", "Water bottle", "Gardening gloves if you have them"],
    imageUrl: "/images/gardening.jpeg"
  },
  
  // Additional events from Events.js component
  {
    id: 101,
    title: "GetFit @ ImpactFit",
    description: "GetFit Programme aim to cultivate a movement towards personal responsibility in Fitness and Wellness. Within each session, a series of strength and mobility enhancing exercises will be conducted to promote physical fitness, while participants will also gain insights on exercise programming and the pillars of movement.",
    category: "Exercise",
    program: "Sunrise In The City (SITC)",
    location: {
      name: "JURONG WEST, SJ Campus - Impact Fit",
      address: "Jurong West, Singapore"
    },
    schedule: {
      startDate: "2025-04-21",
      endDate: "2025-04-21",
      daysOfWeek: ["Monday"],
      time: "11:45 AM - 12:45 PM"
    },
    host: "SJD & TRUE Group",
    contact: "87498775",
    email: "sjd.hpb23@gmail.com",
    maxParticipants: 20,
    currentParticipants: 15,
    slots: 5,
    intensity: 1,
    virtual: false,
    recommended: true,
    directions: "After enter from main entrance, proceed along the main corridor, after the foodcourt on your right hand side, lookout for the gym on your right.",
    note: "We kindly request registered participants to arrive on time. Latecomers and walk-ins will be admitted if capacity allows."
  },
  {
    id: 102,
    title: "Aqua Fitness",
    description: "A low-impact water-based exercise class that is gentle on the joints while providing a good workout.",
    category: "Exercise",
    program: "Active Health",
    location: {
      name: "YISHUN, SAFRA",
      address: "Yishun, Singapore"
    },
    schedule: {
      startDate: "2025-04-21",
      endDate: "2025-04-21",
      daysOfWeek: ["Monday"],
      time: "10:00 AM - 11:00 AM"
    },
    intensity: 2,
    virtual: false,
    slots: 6,
    recommended: false
  },
  {
    id: 103,
    title: "Gentle Yoga",
    description: "A gentle yoga class focusing on flexibility and relaxation, suitable for all levels.",
    category: "Exercise",
    program: "Healthy Workplace Ecosystem (HWE)",
    location: {
      name: "BOON KENG, 80 Bendemeer Road - #09-01",
      address: "Boon Keng, Singapore"
    },
    schedule: {
      startDate: "2025-04-21",
      endDate: "2025-04-21",
      daysOfWeek: ["Monday"],
      time: "11:00 AM - 12:00 PM"
    },
    intensity: 1,
    virtual: false,
    recommended: true
  },
  {
    id: 104,
    title: "Work Great - Dance Remix",
    description: "A fun dance workout session that combines fitness with enjoyable dance moves.",
    category: "Exercise",
    program: "Healthy Workplace Ecosystem (HWE)",
    location: {
      name: "Zoom, Virtual Event",
      address: "Online"
    },
    schedule: {
      startDate: "2025-04-21",
      endDate: "2025-04-21",
      daysOfWeek: ["Monday"],
      time: "12:00 PM - 1:00 PM"
    },
    virtual: true,
    intensity: 1,
    recommended: false
  },
  {
    id: 105,
    title: "Back, Neck & Shoulder (Platinum Yoga @ Westgate)",
    description: "A specialized yoga session focusing on relieving tension and improving mobility in the back, neck, and shoulder areas.",
    category: "Exercise",
    program: "Sunrise In The City (SITC)",
    location: {
      name: "WESTGATE, 3 Gateway Drive",
      address: "Westgate, Singapore"
    },
    schedule: {
      startDate: "2025-04-21",
      endDate: "2025-04-21",
      daysOfWeek: ["Monday"],
      time: "12:30 PM - 1:30 PM"
    },
    intensity: 2,
    virtual: false,
    recommended: true
  },
  {
    id: 106,
    title: "Morning Tai Chi",
    description: "Learn the ancient Chinese practice of Tai Chi with slow, flowing movements that promote balance and relaxation.",
    category: "Exercise",
    program: "Sunrise In The City (SITC)",
    location: {
      name: "MARINE PARADE, Community Center",
      address: "Marine Parade, Singapore"
    },
    schedule: {
      startDate: "2025-04-22",
      endDate: "2025-04-22",
      daysOfWeek: ["Tuesday"],
      time: "9:00 AM - 10:00 AM"
    },
    slots: 3,
    intensity: 1,
    virtual: false,
    recommended: true
  },
  {
    id: 107,
    title: "Senior Fitness",
    description: "A fitness class tailored specifically for seniors, focusing on strength, balance, and mobility.",
    category: "Exercise",
    program: "Healthy Workplace Ecosystem (HWE)",
    location: {
      name: "TAMPINES, Tampines Hub",
      address: "Tampines, Singapore"
    },
    schedule: {
      startDate: "2025-04-22",
      endDate: "2025-04-22",
      daysOfWeek: ["Tuesday"],
      time: "11:00 AM - 12:00 PM"
    },
    slots: 2,
    intensity: 2,
    virtual: false,
    recommended: true
  },
  {
    id: 108,
    title: "Pilates for Beginners",
    description: "An introductory Pilates class focusing on core strength and proper alignment, suitable for beginners.",
    category: "Exercise",
    program: "Active Health",
    location: {
      name: "Zoom, Virtual Event",
      address: "Online"
    },
    schedule: {
      startDate: "2025-04-23",
      endDate: "2025-04-23",
      daysOfWeek: ["Wednesday"],
      time: "3:00 PM - 4:00 PM"
    },
    virtual: true,
    intensity: 2
  },
  {
    id: 109,
    title: "Evening Stretch",
    description: "A relaxing stretching session perfect for unwinding at the end of the day.",
    category: "Exercise",
    program: "Sunrise In The City (SITC)",
    location: {
      name: "CLEMENTI, Clementi Mall",
      address: "Clementi, Singapore"
    },
    schedule: {
      startDate: "2025-04-24",
      endDate: "2025-04-24",
      daysOfWeek: ["Thursday"],
      time: "5:00 PM - 6:00 PM"
    },
    slots: 8,
    intensity: 1,
    virtual: false,
    recommended: false
  },
  {
    id: 110,
    title: "HIIT Workout",
    description: "A high-intensity interval training workout that alternates between intense bursts of activity and fixed periods of less-intense activity or rest.",
    category: "Exercise",
    program: "Active Health",
    location: {
      name: "PUNGGOL, Waterway Point",
      address: "Punggol, Singapore"
    },
    schedule: {
      startDate: "2025-04-25",
      endDate: "2025-04-25",
      daysOfWeek: ["Friday"],
      time: "4:30 PM - 5:30 PM"
    },
    slots: 4,
    intensity: 3,
    virtual: false,
    recommended: true
  }
];

export default events;