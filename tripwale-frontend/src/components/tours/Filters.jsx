import { X, IndianRupee, Calendar, MapPin } from 'lucide-react';

const Filters = ({ filters, onChange }) => {
  const destinations = [
    'All',
    'Goa',
    'Kerala',
    'Rajasthan',
    'Himachal',
    'Andaman',
    'Sikkim',
    'Uttarakhand',
  ];

  const handlePriceChange = (min, max) => {
    onChange({ ...filters, priceRange: [min, max] });
  };

  const handleDestinationChange = (dest) => {
    onChange({ ...filters, destination: dest === 'All' ? '' : dest });
  };

  const handleDurationChange = (duration) => {
    onChange({ ...filters, duration: duration === 'All' ? '' : duration });
  };

  const clearFilters = () => {
    onChange({
      destination: '',
      priceRange: [0, 50000],
      duration: '',
      sortBy: 'popular',
    });
  };

  const priceRanges = [
    { label: 'Under ₹10,000', min: 0, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
    { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
    { label: 'Over ₹50,000', min: 50000, max: 100000 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
        >
          <X size={16} className="mr-1" />
          Clear All
        </button>
      </div>

      {/* Destination Filter */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <MapPin size={20} className="text-gray-500 mr-2" />
          <h4 className="font-semibold">Destination</h4>
        </div>
        <div className="space-y-2">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => handleDestinationChange(dest)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.destination === (dest === 'All' ? '' : dest)
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <IndianRupee size={20} className="text-gray-500 mr-2" />
          <h4 className="font-semibold">Price Range</h4>
        </div>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handlePriceChange(range.min, range.max)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
          
          {/* Custom Range */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calendar size={20} className="text-gray-500 mr-2" />
          <h4 className="font-semibold">Duration</h4>
        </div>
        <div className="space-y-2">
          {[
            { label: 'All', value: '' },
            { label: 'Short (1-5 days)', value: 'short' },
            { label: 'Medium (6-10 days)', value: 'medium' },
            { label: 'Long (10+ days)', value: 'long' },
          ].map((duration) => (
            <button
              key={duration.value}
              onClick={() => handleDurationChange(duration.value)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.duration === duration.value
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {duration.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      <div className="pt-6 border-t">
        <h4 className="font-semibold mb-3">Active Filters</h4>
        <div className="flex flex-wrap gap-2">
          {filters.destination && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
              {filters.destination}
              <button
                onClick={() => handleDestinationChange('All')}
                className="ml-2"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {filters.duration && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
              {filters.duration === 'short' ? 'Short Trip' : 
               filters.duration === 'medium' ? 'Medium Trip' : 'Long Trip'}
              <button
                onClick={() => handleDurationChange('')}
                className="ml-2"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700">
            ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
          </span>
        </div>
      </div>

      {/* Apply Button for mobile */}
      <button
        onClick={() => {}}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg mt-6 lg:hidden"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;