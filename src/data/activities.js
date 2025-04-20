// Mock activity data for ElderFit application
const activities = [
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
    imageUrl: "https://example.com/tai-chi.jpg"
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
    imageUrl: "https://example.com/crochet.jpg"
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
    imageUrl: "https://example.com/karaoke.jpg"
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
    imageUrl: "https://example.com/digital-workshop.jpg"
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
    imageUrl: "https://example.com/senior-yoga.jpg"
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
    imageUrl: "https://example.com/garden-club.jpg"
  }
];

export default activities;