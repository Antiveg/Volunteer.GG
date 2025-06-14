export const miniEventCardsData = [
  {
    id: 'mini1',
    imageUrl: 'https://via.placeholder.com/300x200?text=Nature+Walk',
    points: "25 Pts",
    tags: [{ text: "Hike", type: "pinkishPurple" }, { text: "Scenic", type: "cyan" }],
    title: "Forest Trail Discovery",
    dateTime: "01 Aug 2025, 08:00",
    location: "Green Valley",
    friendsJoined: 3,
  },
  {
    id: 'mini2',
    imageUrl: 'https://via.placeholder.com/300x200?text=Art+Class',
    points: "15 Pts",
    tags: [{ text: "Creative", type: "cyan" }, { text: "Relax", type: "salmonPink" }],
    title: "Watercolor Workshop",
    dateTime: "03 Aug 2025, 13:00",
    location: "Art Center",
    friendsJoined: 5,
  },
  {
    id: 'mini3',
    imageUrl: 'https://via.placeholder.com/300x200?text=Music+Night',
    points: "30 Pts",
    tags: [{ text: "Live", type: "pinkishPurple" }, { text: "Acoustic", type: "salmonPink" }],
    title: "Acoustic Evening",
    dateTime: "05 Aug 2025, 19:30",
    location: "The Local Pub",
    friendsJoined: 12,
  },
  {
    id: 'mini4',
    imageUrl: 'https://via.placeholder.com/300x200?text=Food+Fest',
    points: "20 Pts",
    tags: [{ text: "Taste", type: "cyan" }, { text: "Local", type: "pinkishPurple" }],
    title: "Culinary Delights",
    dateTime: "07 Aug 2025, 11:00",
    location: "Market Square",
    friendsJoined: 0,
  },
  {
    id: 'mini5',
    imageUrl: 'https://via.placeholder.com/300x200?text=Book+Club',
    points: "10 Pts",
    tags: [{ text: "Read", type: "salmonPink" }, { text: "Discuss", type: "cyan" }],
    title: "Monthly Book Club",
    dateTime: "09 Aug 2025, 18:00",
    location: "Library Hall",
    friendsJoined: 7,
  },
  {
    id: 'mini6',
    imageUrl: 'https://via.placeholder.com/300x200?text=Tech+Talk',
    points: "25 Pts",
    tags: [{ text: "Learn", type: "pinkishPurple" }, { text: "Network", type: "cyan" }],
    title: "Future of AI",
    dateTime: "11 Aug 2025, 17:00",
    location: "Tech Park",
    friendsJoined: 4,
  },
];

// Sample data for the main EventCarousel (from your EventCarousel.jsx)
export const mainCarouselEventsData = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/600x400?text=Big+Event+1',
    points: '75 Pts',
    multiplier: '3x',
    title: 'Lorem Ipsum Dolores Spectaculum',
    tags: [{ text: 'Featured', type: 'green' }, { text: 'Popular', type: 'blue' }],
    dateTime: '01 Aug 2025, 10:00 - 18:00',
    location: 'Grand Arena, Jakarta',
    company: 'Epic Events Co.',
    description: 'Experience the most anticipated event of the year! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.'
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/600x400?text=Big+Event+2',
    points: '50 Pts',
    multiplier: '2x',
    title: 'Festival of Lights Illuminate',
    tags: [{ text: 'Culture', type: 'green' }, { text: 'Family', type: 'blue' }],
    dateTime: '15 Aug 2025, 19:00 - 23:00',
    location: 'City Gardens, Bandung',
    company: 'Creative Shows Ltd.',
    description: 'A magical night with spectacular light displays and performances. Proin vel justo et ex pharetra scelerisque.'
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/600x400?text=Big+Event+3',
    points: '80 Pts',
    multiplier: '4x',
    title: 'Summer Music Fest',
    tags: [{ text: 'Music', type: 'green' }, { text: 'Outdoor', type: 'blue' }],
    dateTime: '20 Sep 2025, 14:00 - 23:00',
    location: 'Greenfield Park',
    company: 'Vibes Ltd.',
    description: 'The biggest summer music festival with top artists and bands. Enjoy great music under the sun and stars!'
  }
];

export const events_api_result = [
  {
    "id": "1",
    "name": "Tech Future Conference 2025",
    "datetime": "2025-07-10T09:00:00",
    "location": "Jakarta Convention Center, Indonesia",
    "base_points": 50,
    "final_points": 150,
    "description": "A global conference bringing together tech leaders to discuss the future of innovation, AI, and sustainability.",
    "start_datetime": "2025-07-10T09:00:00",
    "end_datetime": "2025-07-10T17:00:00",
    "certificate_url": "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg",
    "categories": [
      {
        "id": "1",
        "category": "Music",
        "color": "#FF6347"
      }
    ],
    "photos": [
      "https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg",
      "https://fps.cdnpk.net/photos/home/cover_v3.webp?im=AspectCrop=(640,480),xPosition=0.5"
    ],
    "organization_name": "Yayasan Temporary",
    "friend_count": 1
  },
  {
    "id": "2",
    "name": "Green Earth Clean-Up Drive",
    "datetime": "2025-08-05T07:30:00",
    "location": "Greenfield Park, Bandung",
    "base_points": 30,
    "final_points": 90,
    "description": "Join the community for a clean-up initiative to restore the natural beauty of Greenfield Park.",
    "start_datetime": "2025-08-05T07:30:00",
    "end_datetime": "2025-08-05T12:00:00",
    "certificate_url": "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg",
    "categories": [
      {
        "id": "4",
        "category": "Technology",
        "color": "#00BFFF"
      }
    ],
    "photos": [
      "https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg"
    ],
    "organization_name": "Yayasan Temporary",
    "friend_count": 1
  },
  {
    "id": "3",
    "name": "Digital Art & NFT Workshop",
    "datetime": "2025-09-12T13:00:00",
    "location": "Creative Hall, Surabaya",
    "base_points": 40,
    "final_points": 120,
    "description": "Learn the basics of digital art, NFT minting, and blockchain creativity in this hands-on session.",
    "start_datetime": "2025-09-12T13:00:00",
    "end_datetime": "2025-09-12T17:30:00",
    "certificate_url": "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg",
    "categories": [
      {
        "id": "2",
        "category": "Sports",
        "color": "#32CD32"
      }
    ],
    "photos": [
      "https://fps.cdnpk.net/photos/home/cover_v3.webp?im=AspectCrop=(640,480),xPosition=0.5"
    ],
    "organization_name": "Yayasan Temporary",
    "friend_count": 1
  },
  {
    "id": "4",
    "name": "Youth Leadership Summit",
    "datetime": "2025-10-01T10:00:00",
    "location": "Youth Center, Yogyakarta",
    "base_points": 60,
    "final_points": 180,
    "description": "Empowering future leaders through inspiring talks, group activities, and mentorship sessions.",
    "start_datetime": "2025-10-01T10:00:00",
    "end_datetime": "2025-10-01T18:00:00",
    "certificate_url": "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg",
    "categories": [
      {
        "id": "5",
        "category": "Food & Drink",
        "color": "#FFD700"
      }
    ],
    "photos": [
      "https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg"
    ],
    "organization_name": "Yayasan Temporary",
    "friend_count": 0
  },
  {
    "id": "5",
    "name": "Culinary Culture Expo",
    "datetime": "2025-11-20T11:00:00",
    "location": "Expo Hall, Bali",
    "base_points": 20,
    "final_points": 60,
    "description": "Explore the diverse flavors of Indonesian cuisine and attend live cooking demonstrations from top chefs.",
    "start_datetime": "2025-11-20T11:00:00",
    "end_datetime": "2025-11-20T15:30:00",
    "certificate_url": "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg",
    "categories": [
      {
        "id": "3",
        "category": "Art & Culture",
        "color": "#8A2BE2"
      }
    ],
    "photos": [
      "https://fps.cdnpk.net/photos/home/cover_v3.webp?im=AspectCrop=(640,480),xPosition=0.5",
      "https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg"
    ],
    "organization_name": "Yayasan Temporary",
    "friend_count": 0
  }
]