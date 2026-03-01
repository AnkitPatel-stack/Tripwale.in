// src/data/allToursData.js

export const allTours = [
    // Domestic Tours (from Home.jsx and DomesticTours.jsx)
    {
      id: 1,
      title: 'Kashmir Paradise Tour',
      description: 'Experience the heaven on earth with our comprehensive Kashmir tour package. From the beautiful Dal Lake to the snow-capped mountains of Gulmarg, this tour offers everything.',
      location: 'Srinagar, Gulmarg, Pahalgam',
      duration: '6 Nights / 7 Days',
      rating: 4.8,
      price: '₹25,999',
      originalPrice: '₹32,999',
      discount: '21% OFF',
      image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'hill-station',
      tag: 'Most Popular',
      pageType: 'domestic',
      highlights: [
        'Stay in houseboat on Dal Lake',
        'Gondola ride in Gulmarg',
        'Shikara ride experience',
        'Visit to Betaab Valley',
        'Mughal Gardens tour'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Srinagar', description: 'Airport pickup and transfer to houseboat. Evening Shikara ride on Dal Lake.' },
        { day: 2, title: 'Srinagar Local Sightseeing', description: 'Visit Mughal Gardens, Hazratbal Shrine, and local markets.' },
        { day: 3, title: 'Srinagar to Gulmarg', description: 'Drive to Gulmarg. Gondola ride and snow activities.' },
        { day: 4, title: 'Gulmarg to Pahalgam', description: 'Visit Betaab Valley, Aru Valley, and Lidder River.' },
        { day: 5, title: 'Pahalgam Exploration', description: 'Full day exploring Pahalgam valleys and waterfalls.' },
        { day: 6, title: 'Return to Srinagar', description: 'Return drive with shopping stops.' },
        { day: 7, title: 'Departure', description: 'Airport drop and departure.' }
      ],
      inclusions: [
        'Accommodation in 3-star hotels',
        'Daily breakfast and dinner',
        'AC vehicle for all transfers',
        'All sightseeing as per itinerary',
        'Gondola ride ticket',
        'Shikara ride experience',
        'Driver allowance and toll taxes',
        'All applicable taxes'
      ],
      exclusions: [
        'Air/train tickets',
        'Lunch during the tour',
        'Personal expenses',
        'Travel insurance',
        'Anything not mentioned in inclusions'
      ],
      bestTime: 'April to October',
      groupSize: '2-15 people',
      difficulty: 'Easy',
      reviews: [
        { name: 'Rajesh Kumar', rating: 5, comment: 'Amazing experience! The houseboat stay was unforgettable.' },
        { name: 'Priya Sharma', rating: 4.5, comment: 'Beautiful locations and well-organized tour.' },
        { name: 'Amit Verma', rating: 5, comment: 'Best family vacation we ever had. Highly recommended!' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593693399746-4c0514be15c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 2,
      title: 'Kerala Backwaters',
      description: 'Experience the serene backwaters of Kerala with houseboat stay, tea gardens, and cultural shows.',
      location: 'Alleppey, Munnar, Thekkady',
      duration: '5 Nights / 6 Days',
      rating: 4.7,
      price: '₹21,499',
      originalPrice: '₹28,499',
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'backwater',
      tag: 'Best Seller',
      pageType: 'domestic',
      highlights: [
        'Houseboat stay in Alleppey',
        'Tea plantation tour in Munnar',
        'Kathakali dance performance',
        'Spice plantation visit',
        'Boat safari in Periyar'
      ],
      itinerary: [
        { day: 1, title: 'Cochin Arrival', description: 'Airport pickup and city tour.' },
        { day: 2, title: 'Cochin to Munnar', description: 'Drive to Munnar, visit tea gardens.' },
        { day: 3, title: 'Munnar Sightseeing', description: 'Visit Echo Point, Mattupetty Dam.' },
        { day: 4, title: 'Munnar to Thekkady', description: 'Drive to Thekkady, spice plantation visit.' },
        { day: 5, title: 'Thekkady to Alleppey', description: 'Drive to Alleppey, evening houseboat check-in.' },
        { day: 6, title: 'Alleppey to Cochin', description: 'Morning backwater cruise, departure.' }
      ],
      inclusions: [
        '5 nights accommodation',
        'Daily breakfast',
        'Alleppey houseboat stay with meals',
        'All transfers in AC vehicle',
        'Sightseeing as per itinerary',
        'Driver allowance'
      ],
      exclusions: [
        'Flight tickets',
        'Lunch & dinner (except houseboat)',
        'Personal expenses',
        'Entry fees to monuments',
        'Guide charges'
      ],
      bestTime: 'September to March',
      groupSize: '2-12 people',
      difficulty: 'Easy',
      reviews: [
        { name: 'Sunita Mehta', rating: 5, comment: 'The houseboat experience was magical!' },
        { name: 'Vikram Singh', rating: 4, comment: 'Beautiful Kerala, well organized tour.' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 3,
      title: 'Rajasthan Heritage Tour',
      description: 'Experience the royal heritage of Rajasthan with visits to magnificent forts, palaces, and cultural experiences.',
      location: 'Jaipur, Udaipur, Jaisalmer',
      duration: '7 Nights / 8 Days',
      rating: 4.9,
      price: '₹29,999',
      originalPrice: '₹37,999',
      discount: '21% OFF',
      image: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'heritage',
      tag: 'Cultural',
      pageType: 'domestic',
      highlights: [
        'Visit Amer Fort and City Palace',
        'Sunset at Lake Pichola',
        'Desert safari in Jaisalmer',
        'Cultural folk dance performance',
        'Traditional Rajasthani cuisine'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Jaipur', description: 'Airport pickup and check-in. Evening free for leisure.' },
        { day: 2, title: 'Jaipur Sightseeing', description: 'Visit Amer Fort, City Palace, Jantar Mantar, and Hawa Mahal.' },
        { day: 3, title: 'Jaipur to Udaipur', description: 'Drive to Udaipur. Evening boat ride on Lake Pichola.' },
        { day: 4, title: 'Udaipur Sightseeing', description: 'Visit City Palace, Jagdish Temple, and Sahelion-ki-Bari.' },
        { day: 5, title: 'Udaipur to Jaisalmer', description: 'Drive to Jaisalmer. Evening free for exploration.' },
        { day: 6, title: 'Jaisalmer Sightseeing', description: 'Visit Jaisalmer Fort, Patwon ki Haveli, and Sam Sand Dunes.' },
        { day: 7, title: 'Desert Safari', description: 'Full day desert safari with camel ride and cultural program.' },
        { day: 8, title: 'Departure', description: 'Transfer to airport for departure.' }
      ],
      inclusions: [
        '7 nights accommodation in heritage hotels',
        'Daily breakfast and dinner',
        'AC vehicle for all transfers',
        'All sightseeing as per itinerary',
        'Desert safari with camel ride',
        'Cultural performance',
        'Driver allowance and toll taxes',
        'All applicable taxes'
      ],
      exclusions: [
        'Air/train tickets',
        'Lunch during the tour',
        'Personal expenses',
        'Entry fees to monuments',
        'Camera fees'
      ],
      bestTime: 'October to March',
      groupSize: '2-12 people',
      difficulty: 'Easy',
      reviews: [
        { name: 'Amit Verma', rating: 5, comment: 'Best travel experience ever! Rajasthan tour was perfectly organized.' },
        { name: 'Priya Sharma', rating: 4.5, comment: 'Beautiful palaces and excellent guide.' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 4,
      title: 'Himalayan Adventure Trek',
      description: 'Trek through beautiful valleys and experience the majestic Himalayas.',
      location: 'Manali, Kasol, Solang Valley',
      duration: '5 Nights / 6 Days',
      rating: 4.6,
      price: '₹18,999',
      originalPrice: '₹24,999',
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'trekking',
      tag: 'Adventure',
      pageType: 'trekking',
      highlights: [
        'Trek to Hampta Pass',
        'Camping under the stars',
        'Visit to Solang Valley',
        'River crossing experience',
        'Professional trek guide'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Manali', description: 'Arrival and acclimatization. Briefing about the trek.' },
        { day: 2, title: 'Manali to Jobra', description: 'Drive to Jobra and trek to Chika.' },
        { day: 3, title: 'Chika to Balu Ka Ghera', description: 'Trek through beautiful landscapes.' },
        { day: 4, title: 'Balu Ka Ghera to Hampta Pass', description: 'Cross the Hampta Pass and descend.' },
        { day: 5, title: 'Return to Manali', description: 'Trek back and drive to Manali.' },
        { day: 6, title: 'Departure', description: 'Transfer to airport/bus stand.' }
      ],
      inclusions: [
        'Accommodation in camps/hotels',
        'All meals during trek',
        'Professional trek guide',
        'Camping equipment',
        'First aid and safety gear',
        'Permits and fees'
      ],
      exclusions: [
        'Personal trekking gear',
        'Insurance',
        'Any personal expenses',
        'Tips and gratuities'
      ],
      bestTime: 'May to October',
      groupSize: '4-12 people',
      difficulty: 'Moderate',
      reviews: [
        { name: 'Vikram Singh', rating: 4.5, comment: 'Challenging but rewarding trek!' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 5,
      title: 'Char Dham Yatra',
      description: 'Complete pilgrimage to four sacred shrines - Yamunotri, Gangotri, Kedarnath, and Badrinath.',
      location: 'Yamunotri, Gangotri, Kedarnath, Badrinath',
      duration: '10 Nights / 11 Days',
      rating: 4.9,
      price: '₹34,999',
      originalPrice: '₹44,999',
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1621265113764-2af0479b2d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'religious',
      tag: 'Spiritual',
      pageType: 'religious',
      highlights: [
        'Visit all four sacred shrines',
        'Evening aarti experience',
        'Helicopter option for Kedarnath',
        'Accommodation in pilgrim guest houses',
        'Prasad and puja arrangements'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Haridwar', description: 'Arrival and check-in. Evening Ganga Aarti at Har Ki Pauri.' },
        { day: 2, title: 'Haridwar to Yamunotri', description: 'Drive to Janki Chatti and trek to Yamunotri.' },
        { day: 3, title: 'Yamunotri to Gangotri', description: 'Trek back and drive to Gangotri.' },
        { day: 4, title: 'Gangotri Darshan', description: 'Morning puja and darshan at Gangotri Temple.' },
        { day: 5, title: 'Gangotri to Kedarnath', description: 'Drive to Gaurikund and trek to Kedarnath.' },
        { day: 6, title: 'Kedarnath Darshan', description: 'Morning puja and darshan at Kedarnath Temple.' },
        { day: 7, title: 'Kedarnath to Badrinath', description: 'Trek down and drive to Badrinath.' },
        { day: 8, title: 'Badrinath Darshan', description: 'Morning puja and darshan at Badrinath Temple.' },
        { day: 9, title: 'Badrinath to Rudraprayag', description: 'Drive to Rudraprayag via Joshimath.' },
        { day: 10, title: 'Rudraprayag to Rishikesh', description: 'Drive to Rishikesh. Evening free.' },
        { day: 11, title: 'Departure', description: 'Transfer to Haridwar railway station.' }
      ],
      inclusions: [
        '10 nights accommodation',
        'Daily breakfast and dinner',
        'Transport as per itinerary',
        'Pilgrim registration',
        'Prasad and puja arrangements',
        'Driver allowance'
      ],
      exclusions: [
        'Air/train tickets',
        'Lunch during the tour',
        'Personal expenses',
        'Ponies/palki/doli charges',
        'Helicopter tickets (optional)'
      ],
      bestTime: 'May to June, September to October',
      groupSize: '2-10 people',
      difficulty: 'Moderate',
      reviews: [
        { name: 'Sunita Mehta', rating: 5, comment: 'The Char Dham Yatra was spiritually enriching.' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1621265113764-2af0479b2d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1594736797933-d0a54f6d8a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 6,
      title: 'Goa Beach Holiday',
      description: 'Relax on pristine beaches and enjoy the vibrant nightlife of Goa.',
      location: 'North Goa, South Goa, Dudhsagar',
      duration: '4 Nights / 5 Days',
      rating: 4.5,
      price: '₹16,999',
      originalPrice: '₹21,999',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'beach',
      tag: 'Relaxing',
      pageType: 'domestic',
      highlights: [
        'Beach hopping in North Goa',
        'Sunset cruise experience',
        'Dudhsagar waterfall visit',
        'Portuguese heritage walk',
        'Seafood delicacies'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Goa', description: 'Airport pickup and check-in. Evening at Calangute Beach.' },
        { day: 2, title: 'North Goa Tour', description: 'Visit to Baga, Anjuna, and Vagator beaches.' },
        { day: 3, title: 'South Goa Tour', description: 'Visit to Palolem, Colva beaches and churches.' },
        { day: 4, title: 'Dudhsagar Trip', description: 'Full day trip to Dudhsagar waterfalls.' },
        { day: 5, title: 'Departure', description: 'Free morning. Transfer to airport.' }
      ],
      inclusions: [
        '4 nights accommodation in 3-star hotels',
        'Daily breakfast',
        'AC vehicle for sightseeing',
        'Dudhsagar trip with jeep safari',
        'Sunset cruise'
      ],
      exclusions: [
        'Air/train tickets',
        'Lunch & dinner',
        'Personal expenses',
        'Water sports activities'
      ],
      bestTime: 'November to March',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [
        { name: 'Neha Patel', rating: 4.5, comment: 'Goa trip was fantastic! Great hotels and amazing beaches.' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 7,
      title: 'Ladakh Road Trip',
      description: 'Experience the highest motorable roads and stunning landscapes of Ladakh.',
      location: 'Leh, Nubra Valley, Pangong Lake',
      duration: '7 Nights / 8 Days',
      rating: 4.8,
      price: '₹27,999',
      originalPrice: '₹35,999',
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'adventure',
      tag: 'Biking',
      pageType: 'domestic',
      highlights: [
        'Drive on Khardung La pass',
        'Visit Pangong Lake',
        'Nubra Valley sand dunes',
        'Monastery visits',
        'Camping experience'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Leh', description: 'Acclimatization day. Rest and local market visit.' },
        { day: 2, title: 'Leh Sightseeing', description: 'Visit Magnetic Hill, Gurudwara Pathar Sahib, and Hall of Fame.' },
        { day: 3, title: 'Leh to Nubra Valley', description: 'Drive via Khardung La. Visit Diskit Monastery.' },
        { day: 4, title: 'Nubra Valley Exploration', description: 'Visit Hunder sand dunes and camel ride.' },
        { day: 5, title: 'Nubra to Pangong', description: 'Drive to Pangong Lake via Shyok route.' },
        { day: 6, title: 'Pangong to Leh', description: 'Morning at Pangong, drive back to Leh.' },
        { day: 7, title: 'Leh Monasteries', description: 'Visit Thiksey, Shey, and Hemis monasteries.' },
        { day: 8, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '7 nights accommodation',
        'Daily breakfast and dinner',
        'Transport in SUV',
        'Inner line permits',
        'Experienced driver/guide'
      ],
      exclusions: [
        'Flight tickets',
        'Lunch',
        'Personal expenses',
        'Bike rental (if opting for biking)'
      ],
      bestTime: 'June to September',
      groupSize: '2-8 people',
      difficulty: 'Moderate',
      reviews: [
        { name: 'Rahul Nair', rating: 5, comment: 'Ladakh road trip was an adventure of a lifetime!' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 8,
      title: 'South India Temple Tour',
      description: 'Explore the magnificent temples of South India with their unique architecture and spiritual significance.',
      location: 'Chennai, Mahabalipuram, Kanchipuram',
      duration: '6 Nights / 7 Days',
      rating: 4.7,
      price: '₹22,499',
      originalPrice: '₹28,999',
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'religious',
      tag: 'Temples',
      pageType: 'religious',
      highlights: [
        'Visit Shore Temple',
        'Explore Kanchipuram temples',
        'Chennai city tour',
        'Traditional South Indian meals',
        'Silk saree shopping'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Chennai', description: 'Airport pickup and check-in. Evening free.' },
        { day: 2, title: 'Chennai Sightseeing', description: 'Visit Kapaleeshwarar Temple, San Thome Church.' },
        { day: 3, title: 'Chennai to Mahabalipuram', description: 'Drive to Mahabalipuram. Visit Shore Temple.' },
        { day: 4, title: 'Mahabalipuram Exploration', description: 'Visit Pancha Rathas, Arjuna\'s Penance.' },
        { day: 5, title: 'Mahabalipuram to Kanchipuram', description: 'Drive to Kanchipuram. Visit Ekambareswarar Temple.' },
        { day: 6, title: 'Kanchipuram Temples', description: 'Visit Kailasanathar Temple, Varadharaja Perumal Temple.' },
        { day: 7, title: 'Departure', description: 'Transfer to Chennai airport.' }
      ],
      inclusions: [
        '6 nights accommodation',
        'Daily breakfast',
        'AC vehicle for transfers',
        'Sightseeing as per itinerary',
        'Guide services'
      ],
      exclusions: [
        'Flight tickets',
        'Lunch & dinner',
        'Personal expenses',
        'Entry fees to monuments'
      ],
      bestTime: 'October to March',
      groupSize: '2-10 people',
      difficulty: 'Easy',
      reviews: [
        { name: 'Sanjay Gupta', rating: 5, comment: 'South India temple tour was culturally enriching.' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1594736797933-d0a54f6d8a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 9,
      title: 'Panchamari',
      description: 'Explore the lush green landscapes and stunning waterfalls of Panchamari.',
      location: 'Panchamari, Madhya Pradesh',
      duration: '8 Days',
      rating: 4.7,
      price: '₹18,999',
      originalPrice: '₹24,999',
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'hill-station',
      tag: 'Nature Escape',
      pageType: 'domestic',
      highlights: [
        'Visit to Bee Falls',
        'Jata Shankar caves exploration',
        'Sunset at Pachmarhi',
        'Trek to Dhoopgarh',
        'Handi Khoh viewpoint'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Panchamari', description: 'Arrival and check-in. Evening free for leisure.' },
        { day: 2, title: 'Local Sightseeing', description: 'Visit Bee Falls, Jata Shankar Caves.' },
        { day: 3, title: 'Dhoopgarh Trek', description: 'Trek to Dhoopgarh, the highest point in MP.' },
        { day: 4, title: 'Satpura Exploration', description: 'Visit Pandav Caves, Apsara Vihar.' },
        { day: 5, title: 'Handi Khoh', description: 'Visit Handi Khoh viewpoint and sunset point.' },
        { day: 6, title: 'Rajendra Giri', description: 'Visit Rajendra Giri and local temples.' },
        { day: 7, title: 'Nature Walk', description: 'Guided nature walk in Satpura forest.' },
        { day: 8, title: 'Departure', description: 'Transfer to railway station.' }
      ],
      inclusions: [
        '7 nights accommodation',
        'Daily breakfast',
        'AC vehicle for local transfers',
        'Guide for sightseeing',
        'Forest permits'
      ],
      exclusions: [
        'Train tickets',
        'Lunch & dinner',
        'Personal expenses',
        'Camera fees'
      ],
      bestTime: 'October to June',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 10,
      title: 'Udaipur - Mount Abu',
      description: 'Experience the royal heritage of Udaipur and the cool hills of Mount Abu.',
      location: 'Udaipur, Mount Abu, Rajasthan',
      duration: '7 Days',
      rating: 4.8,
      price: '₹22,999',
      originalPrice: '₹29,999',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'heritage',
      tag: 'Bestseller',
      pageType: 'domestic',
      highlights: [
        'Boat ride on Lake Pichola',
        'Visit City Palace, Udaipur',
        'Sunset at Nakki Lake',
        'Dilwara Jain Temples',
        'Guru Shikhar trek'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Udaipur', description: 'Airport pickup and check-in. Evening boat ride.' },
        { day: 2, title: 'Udaipur Sightseeing', description: 'Visit City Palace, Jagdish Temple, Sahelion-ki-Bari.' },
        { day: 3, title: 'Udaipur to Mount Abu', description: 'Drive to Mount Abu. Evening at Nakki Lake.' },
        { day: 4, title: 'Mount Abu Sightseeing', description: 'Visit Dilwara Temples, Guru Shikhar.' },
        { day: 5, title: 'Mount Abu Exploration', description: 'Sunset point and local markets.' },
        { day: 6, title: 'Return to Udaipur', description: 'Drive back to Udaipur. Free evening.' },
        { day: 7, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '6 nights accommodation',
        'Daily breakfast',
        'AC vehicle for all transfers',
        'Sightseeing as per itinerary',
        'Boat ride ticket'
      ],
      exclusions: [
        'Air/train tickets',
        'Lunch & dinner',
        'Personal expenses',
        'Entry fees to monuments'
      ],
      bestTime: 'October to March',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1593693397695-36243b84f70b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 11,
      title: 'Jodhpur - Jaisalmer',
      description: 'Discover the blue city and golden city with desert camping experience.',
      location: 'Jodhpur, Jaisalmer, Rajasthan',
      duration: '8 Days',
      rating: 4.9,
      price: '₹26,999',
      originalPrice: '₹34,999',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1526392587636-9a0e8a0e5c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'heritage',
      tag: 'Bestseller',
      pageType: 'domestic',
      highlights: [
        'Visit Mehrangarh Fort',
        'Desert safari in Jaisalmer',
        'Camping in sand dunes',
        'Patwon ki Haveli',
        'Cultural folk performance'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Jodhpur', description: 'Airport pickup and check-in.' },
        { day: 2, title: 'Jodhpur Sightseeing', description: 'Visit Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace.' },
        { day: 3, title: 'Jodhpur to Jaisalmer', description: 'Drive to Jaisalmer. Evening free.' },
        { day: 4, title: 'Jaisalmer Fort', description: 'Explore Jaisalmer Fort and local markets.' },
        { day: 5, title: 'Desert Safari', description: 'Visit Sam Sand Dunes with camel ride and camping.' },
        { day: 6, title: 'Jaisalmer Sightseeing', description: 'Visit Patwon ki Haveli, Salim Singh ki Haveli.' },
        { day: 7, title: 'Return to Jodhpur', description: 'Drive back to Jodhpur.' },
        { day: 8, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '7 nights accommodation',
        'Daily breakfast and dinner',
        'AC vehicle for all transfers',
        'Desert safari with camping',
        'Sightseeing as per itinerary'
      ],
      exclusions: [
        'Air/train tickets',
        'Lunch',
        'Personal expenses',
        'Camera fees'
      ],
      bestTime: 'October to March',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1526392587636-9a0e8a0e5c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 12,
      title: 'Manali Kasol',
      description: 'Trek through beautiful valleys and experience the hippie culture of Kasol.',
      location: 'Manali, Kasol, Himachal Pradesh',
      duration: '6 Days',
      rating: 4.7,
      price: '₹16,999',
      originalPrice: '₹21,999',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'trekking',
      tag: 'Adventure',
      pageType: 'trekking',
      highlights: [
        'Trek to Kheerganga',
        'Visit to Manikaran Sahib',
        'Parvati Valley exploration',
        'Israeli food in Kasol',
        'Solang Valley adventure'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Manali', description: 'Arrival and check-in. Evening free.' },
        { day: 2, title: 'Manali Sightseeing', description: 'Visit Hadimba Temple, Vashisht hot springs.' },
        { day: 3, title: 'Manali to Kasol', description: 'Drive to Kasol. Explore local cafes.' },
        { day: 4, title: 'Kasol to Kheerganga', description: 'Trek to Kheerganga. Overnight camping.' },
        { day: 5, title: 'Return to Kasol', description: 'Trek back. Visit Manikaran Sahib.' },
        { day: 6, title: 'Departure', description: 'Transfer to bus stand.' }
      ],
      inclusions: [
        '5 nights accommodation',
        'Daily breakfast',
        'Transport as per itinerary',
        'Trek guide for Kheerganga',
        'Camping equipment'
      ],
      exclusions: [
        'Bus/train tickets',
        'Lunch & dinner',
        'Personal expenses',
        'Adventure activities'
      ],
      bestTime: 'April to June, September to November',
      groupSize: '2-8 people',
      difficulty: 'Moderate',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 13,
      title: 'Bali Romantic Getaway',
      description: 'Experience the beauty of Bali with its beaches, temples, and cultural experiences.',
      location: 'Bali, Indonesia',
      duration: '8 Days',
      rating: 4.7,
      price: '₹45,999',
      originalPrice: '₹59,999',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop',
      category: 'asia',
      tag: 'Romantic',
      pageType: 'international',
      flightIncluded: true,
      highlights: [
        'Visit Uluwatu Temple',
        'Sunset at Jimbaran Bay',
        'Ubud Monkey Forest',
        'Tegallalang Rice Terraces',
        'Water sports at Tanjung Benoa'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Bali', description: 'Airport pickup and transfer to hotel.' },
        { day: 2, title: 'South Bali Tour', description: 'Visit GWK Cultural Park, Padang Padang Beach.' },
        { day: 3, title: 'Ubud Exploration', description: 'Visit Ubud Palace, Monkey Forest, Art Market.' },
        { day: 4, title: 'Ubud to Kintamani', description: 'Visit Tegallalang Rice Terraces, Kintamani Volcano.' },
        { day: 5, title: 'Water Sports', description: 'Full day water sports at Tanjung Benoa.' },
        { day: 6, title: 'Temple Tour', description: 'Visit Tanah Lot and Uluwatu Temples.' },
        { day: 7, title: 'Free Day', description: 'Day free for shopping or optional activities.' },
        { day: 8, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '7 nights accommodation',
        'Daily breakfast',
        'Return airport transfers',
        'Sightseeing as per itinerary',
        'English-speaking guide',
        'Water sports (1 activity)'
      ],
      exclusions: [
        'International flights',
        'Visa fees',
        'Lunch & dinner',
        'Personal expenses',
        'Travel insurance'
      ],
      bestTime: 'April to October',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 14,
      title: 'Adman, Nicobar Islands',
      description: 'Tropical paradise with pristine beaches and crystal clear waters.',
      location: 'Andaman & Nicobar Islands',
      duration: '6 Days',
      rating: 4.8,
      price: '₹35,999',
      originalPrice: '₹45,999',
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w-800&auto=format&fit=crop',
      category: 'asia',
      tag: 'Beach Paradise',
      pageType: 'international',
      flightIncluded: true,
      highlights: [
        'Radhanagar Beach visit',
        'Cellular Jail tour',
        'Island hopping',
        'Water sports activities',
        'Sunset at Chidiya Tapu'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Port Blair', description: 'Airport pickup, check-in. Visit Cellular Jail.' },
        { day: 2, title: 'Port Blair to Havelock', description: 'Ferry to Havelock. Visit Radhanagar Beach.' },
        { day: 3, title: 'Havelock Exploration', description: 'Water sports activities at Elephant Beach.' },
        { day: 4, title: 'Havelock to Neil Island', description: 'Ferry to Neil Island. Visit Bharatpur Beach.' },
        { day: 5, title: 'Neil to Port Blair', description: 'Return to Port Blair. Free evening.' },
        { day: 6, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '5 nights accommodation',
        'Daily breakfast',
        'Return airport transfers',
        'Ferry tickets',
        'Sightseeing as per itinerary'
      ],
      exclusions: [
        'Flight tickets',
        'Lunch & dinner',
        'Personal expenses',
        'Water sports activities'
      ],
      bestTime: 'October to May',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w-800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 15,
      title: 'Thailand Beach Holiday',
      description: 'Islands, night markets, and Thai massage for the perfect vacation.',
      location: 'Phuket, Bangkok, Pattaya',
      duration: '7 Days',
      rating: 4.6,
      price: '₹38,999',
      originalPrice: '₹49,999',
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop',
      category: 'asia',
      tag: 'Popular',
      pageType: 'international',
      flightIncluded: true,
      highlights: [
        'Phi Phi Islands tour',
        'Bangkok city tour',
        'Pattaya beach visit',
        'Thai massage experience',
        'Night market shopping'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Phuket', description: 'Airport pickup and transfer to hotel.' },
        { day: 2, title: 'Phi Phi Islands', description: 'Full day island tour with snorkeling.' },
        { day: 3, title: 'Phuket to Bangkok', description: 'Flight to Bangkok. Evening free.' },
        { day: 4, title: 'Bangkok City Tour', description: 'Visit Grand Palace, Wat Phra Kaew.' },
        { day: 5, title: 'Bangkok to Pattaya', description: 'Drive to Pattaya. Evening Alcazar Show.' },
        { day: 6, title: 'Pattaya Exploration', description: 'Visit Coral Island and water sports.' },
        { day: 7, title: 'Departure', description: 'Transfer to Bangkok airport.' }
      ],
      inclusions: [
        '6 nights accommodation',
        'Daily breakfast',
        'Return airport transfers',
        'Domestic flights',
        'Sightseeing as per itinerary'
      ],
      exclusions: [
        'International flights',
        'Visa fees',
        'Lunch & dinner',
        'Personal expenses',
        'Water sports activities'
      ],
      bestTime: 'November to March',
      groupSize: '2-10 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 16,
      title: 'Dubai Luxury Tour',
      description: 'Desert safari, Burj Khalifa, and world-class shopping experiences.',
      location: 'Dubai, Abu Dhabi',
      duration: '6 Days',
      rating: 4.8,
      price: '₹52,999',
      originalPrice: '₹69,999',
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      category: 'middle-east',
      tag: 'Luxury',
      pageType: 'international',
      flightIncluded: true,
      highlights: [
        'Burj Khalifa observation deck',
        'Desert safari with dune bashing',
        'Dubai Mall & Fountain Show',
        'Abu Dhabi Grand Mosque',
        'Dhow cruise dinner'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Dubai', description: 'Airport pickup and transfer to hotel.' },
        { day: 2, title: 'Dubai City Tour', description: 'Visit Burj Khalifa, Dubai Mall, Fountain Show.' },
        { day: 3, title: 'Desert Safari', description: 'Evening desert safari with dune bashing and BBQ dinner.' },
        { day: 4, title: 'Abu Dhabi Tour', description: 'Full day tour to Abu Dhabi, visit Grand Mosque.' },
        { day: 5, title: 'Dhow Cruise', description: 'Free day. Evening Dhow cruise dinner in Dubai Creek.' },
        { day: 6, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '5 nights accommodation in 4-star hotels',
        'Daily breakfast',
        'Return airport transfers',
        'Sightseeing as per itinerary',
        'Desert safari with dinner',
        'Dhow cruise dinner'
      ],
      exclusions: [
        'International flights',
        'Visa fees',
        'Lunch',
        'Personal expenses',
        'Tips'
      ],
      bestTime: 'November to March',
      groupSize: '2-6 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 17,
      title: 'Singapore-Malaysia Combo',
      description: 'City lights and cultural diversity in two amazing countries.',
      location: 'Singapore, Kuala Lumpur',
      duration: '7 Days',
      rating: 4.7,
      price: '₹49,999',
      originalPrice: '₹64,999',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&auto=format&fit=crop',
      category: 'asia',
      tag: 'Popular',
      pageType: 'international',
      flightIncluded: true,
      highlights: [
        'Gardens by the Bay',
        'Sentosa Island visit',
        'Petronas Twin Towers',
        'Batu Caves exploration',
        'Universal Studios Singapore'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Singapore', description: 'Airport pickup and transfer to hotel.' },
        { day: 2, title: 'Singapore City Tour', description: 'Visit Gardens by the Bay, Merlion Park.' },
        { day: 3, title: 'Sentosa Island', description: 'Full day at Sentosa Island.' },
        { day: 4, title: 'Singapore to Kuala Lumpur', description: 'Flight to KL. Evening free.' },
        { day: 5, title: 'Kuala Lumpur Tour', description: 'Visit Petronas Towers, Batu Caves.' },
        { day: 6, title: 'Genting Highlands', description: 'Day trip to Genting Highlands.' },
        { day: 7, title: 'Departure', description: 'Transfer to airport.' }
      ],
      inclusions: [
        '6 nights accommodation',
        'Daily breakfast',
        'Return airport transfers',
        'Flight between Singapore-KL',
        'Sightseeing as per itinerary'
      ],
      exclusions: [
        'International flights',
        'Visa fees',
        'Lunch & dinner',
        'Personal expenses',
        'Universal Studios tickets'
      ],
      bestTime: 'February to April',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 18,
      title: 'Maheshwar Darshan',
      description: 'Experience the spiritual bliss of Maheshwar - temple town on Narmada river banks.',
      location: 'Maheshwar, Madhya Pradesh',
      duration: '12 Hours',
      rating: 4.5,
      price: '₹1,499',
      originalPrice: '₹2,499',
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop',
      category: 'spiritual',
      tag: 'One Day Trip',
      pageType: 'oneDay',
      highlights: [
        'Ahilya Fort',
        'Narmada Ghat',
        'Ancient Temples',
        'River Cruise'
      ],
      itinerary: [
        { day: 1, title: 'One Day Trip', description: '6:00 AM: Departure from Indore. 8:00 AM: Arrival in Maheshwar. Visit Ahilya Fort and temples. 1:00 PM: Lunch. 2:00 PM: River cruise on Narmada. 4:00 PM: Departure. 6:00 PM: Return to Indore.' }
      ],
      inclusions: [
        'AC transport',
        'Guide',
        'Breakfast',
        'Entry tickets',
        'River cruise'
      ],
      exclusions: [
        'Lunch',
        'Personal expenses',
        'Camera fees'
      ],
      bestTime: 'October to March',
      groupSize: '4-20 people',
      difficulty: 'Easy',
      departure: '6:00 AM',
      distance: '90 km from Indore',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1593693399746-4c0514be15c5?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 19,
      title: 'Mandav Hills Exploration',
      description: 'Discover historic ruins and beautiful architecture of Mandu fort city.',
      location: 'Mandu, Madhya Pradesh',
      duration: '14 Hours',
      rating: 4.7,
      price: '₹1,799',
      originalPrice: '₹2,999',
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1593693399746-4c0514be15c5?w=800&auto=format&fit=crop',
      category: 'historical',
      tag: 'One Day Trip',
      pageType: 'oneDay',
      highlights: [
        'Jahaz Mahal',
        'Hindola Mahal',
        'Baz Bahadur Palace',
        'Scenic Views'
      ],
      itinerary: [
        { day: 1, title: 'One Day Trip', description: '5:30 AM: Departure from Indore. 7:30 AM: Arrival in Mandu. Visit Jahaz Mahal, Hindola Mahal. 1:00 PM: Lunch. 2:00 PM: Visit Rani Roopmati Pavilion. 4:00 PM: Departure. 7:30 PM: Return to Indore.' }
      ],
      inclusions: [
        'AC transport',
        'Guide',
        'Lunch',
        'All entry tickets',
        'Mineral water'
      ],
      exclusions: [
        'Personal expenses',
        'Camera fees'
      ],
      bestTime: 'October to March',
      groupSize: '4-20 people',
      difficulty: 'Easy',
      departure: '5:30 AM',
      distance: '100 km from Indore',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1593693399746-4c0514be15c5?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 20,
      title: 'Omkareshwar Pilgrimage',
      description: 'Spiritual journey to Omkareshwar Jyotirlinga.',
      location: 'Omkareshwar, Madhya Pradesh',
      duration: '15 Hours',
      rating: 4.8,
      price: '₹1,699',
      originalPrice: '₹2,799',
      discount: '39% OFF',
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4c6?w=800&auto=format&fit=crop',
      category: 'spiritual',
      tag: 'One Day Trip',
      pageType: 'oneDay',
      highlights: [
        'Jyotirlinga Darshan',
        'Narmada Aarti',
        'Ancient Temples',
        'Spiritual Experience'
      ],
      itinerary: [
        { day: 1, title: 'One Day Trip', description: '5:00 AM: Departure from Indore. 7:00 AM: Arrival in Omkareshwar. Special darshan and puja. 1:00 PM: Lunch. 2:00 PM: Visit other temples. 4:00 PM: Evening aarti. 6:00 PM: Departure. 8:00 PM: Return to Indore.' }
      ],
      inclusions: [
        'AC transport',
        'Guide',
        'Meals (breakfast, lunch)',
        'Special darshan tickets',
        'Puja materials'
      ],
      exclusions: [
        'Personal expenses',
        'Donations'
      ],
      bestTime: 'October to March',
      groupSize: '4-20 people',
      difficulty: 'Easy',
      departure: '5:00 AM',
      distance: '80 km from Indore',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1588666309990-d68f08e3d4c6?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 21,
      title: 'Ujjain Mahakal Darshan',
      description: 'Visit Mahakaleshwar Temple with special darshan arrangements.',
      location: 'Ujjain, Madhya Pradesh',
      duration: '12 Hours',
      rating: 4.9,
      price: '₹1,599',
      originalPrice: '₹2,599',
      discount: '38% OFF',
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&auto=format&fit=crop',
      category: 'spiritual',
      tag: 'One Day Trip',
      pageType: 'oneDay',
      highlights: [
        'Mahakaleshwar Temple',
        'Bhasma Aarti',
        'Other Temples',
        'Religious Experience'
      ],
      itinerary: [
        { day: 1, title: 'One Day Trip', description: '5:30 AM: Departure from Indore. 7:00 AM: Arrival in Ujjain. Bhasma Aarti darshan. 9:00 AM: Breakfast. 10:00 AM: Visit other temples. 1:00 PM: Lunch. 2:00 PM: Free time for shopping. 4:00 PM: Departure. 6:00 PM: Return to Indore.' }
      ],
      inclusions: [
        'AC transport',
        'Guide',
        'Breakfast',
        'VIP darshan tickets',
        'Puja materials'
      ],
      exclusions: [
        'Lunch',
        'Personal expenses',
        'Donations'
      ],
      bestTime: 'October to March',
      groupSize: '4-20 people',
      difficulty: 'Easy',
      departure: '5:30 AM',
      distance: '55 km from Indore',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 22,
      title: 'Chadar Frozen River Trek',
      description: 'Walk on the frozen Zanskar river - one of the most challenging treks in the world.',
      location: 'Ladakh',
      duration: '9 Days',
      rating: 4.9,
      price: '₹42,999',
      originalPrice: '₹54,999',
      discount: '22% OFF',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
      category: 'winter',
      tag: 'Challenging',
      pageType: 'trekking',
      highlights: [
        'Walk on frozen river',
        'Camping on ice',
        'Stunning winter landscapes',
        'Experience -30°C temperatures',
        'Expert guides'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Leh', description: 'Acclimatization day.' },
        { day: 2, title: 'Leh to Chilling', description: 'Drive and trek preparation.' },
        { day: 3, title: 'Chilling to Tilat Sumdo', description: 'Start of Chadar trek.' },
        { day: 4, title: 'Tilat Sumdo to Gyalpo', description: 'Trek on frozen river.' },
        { day: 5, title: 'Gyalpo to Tibb Cave', description: 'Continue trek on Chadar.' },
        { day: 6, title: 'Tibb Cave to Nerak', description: 'Trek to Nerak waterfall.' },
        { day: 7, title: 'Return trek', description: 'Start return journey.' },
        { day: 8, title: 'Continue return', description: 'Trek back to Chilling.' },
        { day: 9, title: 'Departure', description: 'Drive to Leh and departure.' }
      ],
      inclusions: [
        'All meals during trek',
        'Camping equipment',
        'Professional guide',
        'Permits and fees',
        'Safety equipment',
        'Transport as per itinerary'
      ],
      exclusions: [
        'Flight tickets',
        'Personal trekking gear',
        'Insurance',
        'Tips',
        'Any personal expenses'
      ],
      bestTime: 'January to February',
      groupSize: '4-12 people',
      difficulty: 'Difficult',
      altitude: '3850m',
      season: 'Winter',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
      ]
    },
    {
      id: 23,
      title: 'Valley of Flowers',
      description: 'Alpine meadows with exotic flowers in full bloom.',
      location: 'Uttarakhand',
      duration: '6 Days',
      rating: 4.8,
      price: '₹18,999',
      originalPrice: '₹24,999',
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      category: 'summer',
      tag: 'Scenic',
      pageType: 'trekking',
      highlights: [
        'UNESCO World Heritage Site',
        'Exotic flowers and flora',
        'Himalayan views',
        'Photography paradise',
        'Hemkund Sahib visit'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Haridwar', description: 'Pickup and drive to Govindghat.' },
        { day: 2, title: 'Govindghat to Ghangaria', description: 'Trek to Ghangaria.' },
        { day: 3, title: 'Valley of Flowers', description: 'Full day exploring the valley.' },
        { day: 4, title: 'Hemkund Sahib', description: 'Trek to Hemkund Sahib.' },
        { day: 5, title: 'Return to Govindghat', description: 'Trek back.' },
        { day: 6, title: 'Departure', description: 'Drive to Haridwar and departure.' }
      ],
      inclusions: [
        'Accommodation in camps/hotels',
        'All meals',
        'Professional guide',
        'Permits and fees',
        'Transport as per itinerary'
      ],
      exclusions: [
        'Train tickets',
        'Personal expenses',
        'Insurance',
        'Tips'
      ],
      bestTime: 'July to September',
      groupSize: '4-15 people',
      difficulty: 'Moderate',
      altitude: '3658m',
      season: 'Monsoon',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba'
      ]
    },
    {
      id: 24,
      title: 'Hampta Pass Trek',
      description: 'Cross from lush green valleys to barren landscape of Lahaul.',
      location: 'Himachal Pradesh',
      duration: '5 Days',
      rating: 4.7,
      price: '₹15,999',
      originalPrice: '₹20,999',
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      category: 'summer',
      tag: 'Popular',
      pageType: 'trekking',
      highlights: [
        'Diverse landscapes',
        'Camping under stars',
        'River crossings',
        'Snow at high altitudes',
        'Professional guides'
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Manali', description: 'Drive to Jobra and trek to Chika.' },
        { day: 2, title: 'Chika to Balu Ka Ghera', description: 'Trek through beautiful landscapes.' },
        { day: 3, title: 'Cross Hampta Pass', description: 'Cross the pass and descend to Chatru.' },
        { day: 4, title: 'Chatru to Chandratal', description: 'Visit Chandratal Lake.' },
        { day: 5, title: 'Return to Manali', description: 'Drive back to Manali.' }
      ],
      inclusions: [
        'Accommodation in camps',
        'All meals',
        'Professional guide',
        'Camping equipment',
        'Permits',
        'Transport as per itinerary'
      ],
      exclusions: [
        'Personal trekking gear',
        'Insurance',
        'Tips',
        'Any personal expenses'
      ],
      bestTime: 'June to September',
      groupSize: '4-12 people',
      difficulty: 'Moderate',
      altitude: '4270m',
      season: 'Summer',
      reviews: [],
      gallery: [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba',
        'https://images.unsplash.com/photo-1551632811-561732d1e306'
      ]
    }
  ];