import { useParams } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Check, 
  X, 
  Heart,
  Share2,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import { tourPackages } from '../services/data';

const TourDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the tour by ID
  const tour = tourPackages.find(pkg => pkg.id === parseInt(id)) || tourPackages[0];

  const images = [
    tour.image,
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
  ];

  const itinerary = [
    { day: 1, title: 'Arrival & Welcome', description: 'Arrive at destination, hotel check-in, welcome dinner' },
    { day: 2, title: 'City Exploration', description: 'Guided city tour, visit major attractions, local cuisine experience' },
    { day: 3, title: 'Adventure Day', description: 'Activities based on destination - could be trekking, water sports, or cultural experiences' },
    { day: 4, title: 'Local Immersion', description: 'Visit local markets, interact with communities, traditional performances' },
    { day: 5, title: 'Relaxation & Departure', description: 'Leisure time, optional activities, departure' },
  ];

  const inclusions = [
    'Accommodation in 3-star hotels',
    'Daily breakfast',
    'All transfers and sightseeing',
    'Professional tour guide',
    'Entry fees to monuments',
    '24/7 support during trip',
  ];

  const exclusions = [
    'Airfare/train tickets',
    'Travel insurance',
    'Personal expenses',
    'Lunch and dinner (unless specified)',
    'Tips and gratuities',
    'Anything not mentioned in inclusions',
  ];

  const handleBookNow = () => {
    alert('Booking functionality will be implemented in the backend phase!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={images[selectedImage]} 
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">{tour.destination}</span>
              </div>
              <div className="flex items-center">
                <Star size={20} className="mr-2" />
                <span className="text-lg">{tour.rating} ({tour.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 mb-6">
                {tour.description} This package offers the perfect blend of adventure, 
                relaxation, and cultural immersion. Carefully curated by our travel experts, 
                this journey takes you through the most breathtaking sights and authentic 
                experiences that {tour.destination} has to offer.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <Clock size={32} className="text-primary-600 mx-auto mb-2" />
                  <div className="font-bold text-lg">{tour.duration}</div>
                  <div className="text-gray-600 text-sm">Duration</div>
                </div>
                <div className="text-center">
                  <Users size={32} className="text-primary-600 mx-auto mb-2" />
                  <div className="font-bold text-lg">2-12 People</div>
                  <div className="text-gray-600 text-sm">Group Size</div>
                </div>
                <div className="text-center">
                  <Calendar size={32} className="text-primary-600 mx-auto mb-2" />
                  <div className="font-bold text-lg">All Year</div>
                  <div className="text-gray-600 text-sm">Best Time</div>
                </div>
                <div className="text-center">
                  <MapPin size={32} className="text-primary-600 mx-auto mb-2" />
                  <div className="font-bold text-lg">Multiple</div>
                  <div className="text-gray-600 text-sm">Destinations</div>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day) => (
                  <div key={day.day} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="shrink-0 w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold">
                      Day {day.day}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{day.title}</h3>
                      <p className="text-gray-600">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-green-600">Inclusions</h2>
                <ul className="space-y-3">
                  {inclusions.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check size={20} className="text-green-500 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-red-600">Exclusions</h2>
                <ul className="space-y-3">
                  {exclusions.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <X size={20} className="text-red-500 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              {/* Price Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{tour.discountPrice.toLocaleString()}
                    </div>
                    {tour.discountPrice < tour.price && (
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-gray-400 line-through">
                          ₹{tour.price.toLocaleString()}
                        </span>
                        <span className="text-green-600 font-semibold">
                          Save ₹{(tour.price - tour.discountPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-600 mt-1">per person</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2 rounded-lg ${
                        isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travelers
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500">
                      <option>1 Traveler</option>
                      <option>2 Travelers</option>
                      <option>3 Travelers</option>
                      <option>4 Travelers</option>
                      <option>5+ Travelers</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg mt-6 transition-colors"
                >
                  Book Now
                </button>
                
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Free cancellation up to 7 days before travel
                  </p>
                </div>
              </div>
              
              {/* Need Help */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our travel experts are here to help you plan your perfect trip.
                </p>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg transition-colors">
                    <Phone size={20} />
                    <span>Call +91 9876543210</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg transition-colors">
                    <MessageCircle size={20} />
                    <span>Chat with Expert</span>
                  </button>
                </div>
              </div>
              
              {/* Why Book With Us */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Why Book With TripWale?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check size={20} className="text-green-500 mr-3" />
                    <span className="text-sm">Best Price Guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={20} className="text-green-500 mr-3" />
                    <span className="text-sm">Flexible Payment Options</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={20} className="text-green-500 mr-3" />
                    <span className="text-sm">24/7 Customer Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check size={20} className="text-green-500 mr-3" />
                    <span className="text-sm">Trusted by 10,000+ Travelers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;