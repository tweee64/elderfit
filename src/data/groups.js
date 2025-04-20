// Mock groups data for ElderFit application
const groups = [
  {
    id: 1,
    name: "Bishan Tai Chi Enthusiasts",
    description: "A friendly group that meets regularly for Tai Chi practice and social activities.",
    associatedActivity: 1, // References the Tai Chi activity
    members: 14,
    maxMembers: 25,
    createdDate: "2025-02-15",
    location: {
      name: "Bishan Community Centre",
      address: "51 Bishan Street 13, Singapore 579799"
    },
    meetupFrequency: "Twice a week",
    whatsappGroup: true,
    recentMessages: [
      {
        sender: "Group Leader",
        content: "Remember to bring water bottles tomorrow!",
        timestamp: "2025-04-19T14:30:00"
      },
      {
        sender: "Mdm. Tan",
        content: "Will there be chairs available?",
        timestamp: "2025-04-19T15:05:00"
      },
      {
        sender: "Group Leader",
        content: "Yes, chairs will be provided for those who need them.",
        timestamp: "2025-04-19T15:10:00"
      }
    ]
  },
  {
    id: 2,
    name: "Silver Crafters",
    description: "Share crocheting tips and patterns while making new friends. All skill levels welcome!",
    associatedActivity: 2, // References the Crocheting class
    members: 9,
    maxMembers: 15,
    createdDate: "2025-03-10",
    location: {
      name: "Toa Payoh Community Club",
      address: "93 Toa Payoh Lorong 4, Singapore 310093"
    },
    meetupFrequency: "Weekly",
    whatsappGroup: true,
    recentMessages: [
      {
        sender: "Group Leader",
        content: "Don't forget to bring your latest project to share this Friday!",
        timestamp: "2025-04-18T09:15:00"
      },
      {
        sender: "Mr. Lim",
        content: "Where can I buy more of the blue yarn we used last week?",
        timestamp: "2025-04-18T10:22:00"
      },
      {
        sender: "Mdm. Wong",
        content: "I found it at the craft store in Tampines Mall, level 3.",
        timestamp: "2025-04-18T11:05:00"
      }
    ]
  },
  {
    id: 3,
    name: "AMK Karaoke Buddies",
    description: "We love singing together and supporting each other. Beginners welcome!",
    associatedActivity: 3, // References the Karaoke social
    members: 18,
    maxMembers: 25,
    createdDate: "2025-01-20",
    location: {
      name: "Ang Mo Kio Community Centre",
      address: "795 Ang Mo Kio Ave 1, Singapore 569976"
    },
    meetupFrequency: "Weekly",
    whatsappGroup: true,
    recentMessages: [
      {
        sender: "Group Leader",
        content: "We have new songs added to our playlist this week!",
        timestamp: "2025-04-19T18:30:00"
      },
      {
        sender: "Mr. Chong",
        content: "Can I request 'Home' by Kit Chan for next week?",
        timestamp: "2025-04-19T19:15:00"
      },
      {
        sender: "Group Leader",
        content: "Of course, we'll add it to the list.",
        timestamp: "2025-04-19T19:20:00"
      }
    ]
  },
  {
    id: 4,
    name: "Digital Seniors Network",
    description: "Support group for seniors learning to use technology. We help each other with smartphone and app questions.",
    associatedActivity: 4, // References the Digital Skills Workshop
    members: 12,
    maxMembers: 20,
    createdDate: "2025-03-05",
    location: {
      name: "Woodlands Community Club",
      address: "1 Woodlands Street 81, Singapore 738526"
    },
    meetupFrequency: "Weekly with online support",
    whatsappGroup: true,
    recentMessages: [
      {
        sender: "Group Leader",
        content: "This week we'll focus on setting up the Healthy365 app. Please make sure you've downloaded it.",
        timestamp: "2025-04-18T14:00:00"
      },
      {
        sender: "Mdm. Lee",
        content: "I'm having trouble logging in to the app. Can someone help?",
        timestamp: "2025-04-18T15:30:00"
      },
      {
        sender: "Mr. Tan",
        content: "I can help you before class next week, Mdm. Lee.",
        timestamp: "2025-04-18T16:05:00"
      }
    ]
  },
  {
    id: 5,
    name: "Gentle Yoga Friends",
    description: "Supportive community practicing gentle yoga together. We focus on modifications suitable for seniors.",
    associatedActivity: 5, // References the Gentle Yoga activity
    members: 10,
    maxMembers: 15,
    createdDate: "2025-02-28",
    location: {
      name: "Tampines Community Club",
      address: "2 Tampines Street 41, Singapore 529204"
    },
    meetupFrequency: "Weekly",
    whatsappGroup: true,
    recentMessages: [
      {
        sender: "Group Leader",
        content: "This Thursday we'll focus on gentle stretches for better sleep.",
        timestamp: "2025-04-19T10:00:00"
      },
      {
        sender: "Mr. Kumar",
        content: "Should we bring our own pillows for this session?",
        timestamp: "2025-04-19T12:15:00"
      },
      {
        sender: "Group Leader",
        content: "That would be helpful, but we'll have some extras if needed.",
        timestamp: "2025-04-19T12:30:00"
      }
    ]
  },
  {
    id: 6,
    name: "Jurong Gardeners",
    description: "Community gardening enthusiasts who enjoy growing vegetables and flowers together.",
    associatedActivity: 6, // References the Garden Club
    members: 16,
    maxMembers: 25,
    createdDate: "2025-01-15",
    location: {
      name: "Jurong Central Park",
      address: "Jalan Boon Lay, Singapore 619961"
    },
    meetupFrequency: "Twice weekly",
    whatsappGroup: true,
    recentMessages: [
      {
        sender: "Group Leader",
        content: "We'll be planting new seedlings on Saturday. Please bring gardening gloves if you have them.",
        timestamp: "2025-04-18T17:30:00"
      },
      {
        sender: "Mdm. Ong",
        content: "Will we be harvesting the tomatoes this week?",
        timestamp: "2025-04-18T18:45:00"
      },
      {
        sender: "Group Leader",
        content: "Yes, the tomatoes are ready for harvest. We'll distribute them equally among members.",
        timestamp: "2025-04-18T19:00:00"
      }
    ]
  }
];

export default groups;