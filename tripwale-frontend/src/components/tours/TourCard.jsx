import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Users, ChevronRight } from 'lucide-react';

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {tour.discountPrice < tour.price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Save ₹{tour.price - tour.discountPrice}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{tour.title}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>{tour.destination}</span>
            </div>
          </div>
          <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-lg">
            <Star size={16} className="mr-1" />
            <span className="font-bold">{tour.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{tour.reviews} reviews</span>
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tour.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {tour.discountPrice < tour.price ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">₹{tour.discountPrice.toLocaleString()}</span>
                <span className="text-gray-400 line-through">₹{tour.price.toLocaleString()}</span>
                <span className="text-green-600 text-sm font-semibold">
                  {Math.round((1 - tour.discountPrice / tour.price) * 100)}% off
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">₹{tour.price.toLocaleString()}</span>
            )}
            <p className="text-sm text-gray-500">per person</p>
          </div>
          
          <Link 
            to={`/tours/${tour.id}`}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;