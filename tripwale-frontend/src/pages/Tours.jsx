import { useState } from 'react';
import { Filter, Star, Clock, MapPin, Users } from 'lucide-react';
import { tourPackages } from '../services/data';
import TourCard from '../components/tours/TourCard';
import Filters from '../components/tours/Filters';

const Tours = () => {
  const [filters, setFilters] = useState({
    destination: '',
    priceRange: [0, 50000],
    duration: '',
    sortBy: 'popular',
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter packages based on current filters
  const filteredPackages = tourPackages.filter(pkg => {
    if (filters.destination && pkg.destination !== filters.destination) return false;
    if (pkg.discountPrice < filters.priceRange[0] || pkg.discountPrice > filters.priceRange[1]) return false;
    if (filters.duration) {
      const days = parseInt(pkg.duration.split(' ')[0]);
      if (filters.duration === 'short' && days > 5) return false;
      if (filters.duration === 'medium' && (days <= 5 || days > 10)) return false;
      if (filters.duration === 'long' && days <= 10) return false;
    }
    return true;
  });

  // Sort packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.discountPrice - b.discountPrice;
      case 'price-high':
        return b.discountPrice - a.discountPrice;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-r from-primary-500 to-secondary-600 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Explore Tour Packages</h1>
          <p className="text-xl opacity-90">
            Discover handpicked travel experiences across India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Filters filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Tours Grid */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold">
                    {sortedPackages.length} Tours Found
                  </h2>
                  <p className="text-gray-600">Customize your search using filters</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Filter size={20} />
                    <span>Filters</span>
                  </button>
                  
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            {sortedPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPackages.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <div className="text-6xl mb-4">🧳</div>
                <h3 className="text-2xl font-bold mb-4">No Tours Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find more tours.
                </p>
                <button
                  onClick={() => setFilters({
                    destination: '',
                    priceRange: [0, 50000],
                    duration: '',
                    sortBy: 'popular',
                  })}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Star className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Users className="text-secondary-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-gray-600">Happy Travelers</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-gray-600">Destinations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;