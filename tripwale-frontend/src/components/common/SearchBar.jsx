import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ variant = 'hero' }) => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  });

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to tours page with search parameters
    navigate(`/tours?destination=${searchData.destination}`);
  };

  const destinations = [
    'Goa',
    'Kerala',
    'Rajasthan',
    'Himachal Pradesh',
    'Andaman',
    'Sikkim',
    'Uttarakhand',
    'Ladakh',
  ];

  if (variant === 'compact') {
    return (
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Where do you want to go?"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={searchData.destination}
          onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors"
        >
          Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
              <MapPin size={16} className="mr-2" />
              Destination
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
            >
              <option value="">Where to?</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
              <Calendar size={16} className="mr-2" />
              Check-in
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
              <Calendar size={16} className="mr-2" />
              Check-out
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
              <Users size={16} className="mr-2" />
              Guests
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
            >
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5+">5+ Travelers</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <Search size={20} />
          <span>Search Packages</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;