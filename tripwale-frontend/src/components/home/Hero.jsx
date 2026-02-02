import { Search, MapPin, Calendar, IndianRupee, Users, Headphones, ThumbsUp, Globe } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    budget: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchData);
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in-up">
            Discover Your Next <span className="text-gradient">Adventure</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-200">
            Explore breathtaking destinations with TripWale.in - Your trusted travel companion
          </p>
          
          {/* Search Form */}
          <div className="search-box animate-scale-in delay-400">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-field animate-fade-in-left delay-300">
                <div className="search-icon">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="search-input"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                />
              </div>
              
              <div className="search-field animate-fade-in-up delay-400">
                <div className="search-icon">
                  <Calendar size={20} />
                </div>
                <input
                  type="date"
                  className="search-input"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                />
              </div>
              
              <div className="search-field animate-fade-in-right delay-500">
                <div className="search-icon">
                  <IndianRupee size={20} />
                </div>
                <select
                  className="search-select"
                  value={searchData.budget}
                  onChange={(e) => setSearchData({...searchData, budget: e.target.value})}
                >
                  <option value="">Select Budget</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-20000">₹10,000 - ₹20,000</option>
                  <option value="20000-50000">₹20,000 - ₹50,000</option>
                  <option value="50000+">₹50,000+</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary search-button animate-fade-in-up delay-600"
              >
                <Search size={20} />
                <span>Search Packages</span>
              </button>
            </form>
          </div>
          
          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item animate-fade-in-left delay-700">
              <div className="stat-icon">
                <Globe size={24} />
              </div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Destinations</div>
            </div>
            
            <div className="stat-item animate-fade-in-up delay-750">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            
            <div className="stat-item animate-fade-in-up delay-800">
              <div className="stat-icon">
                <Headphones size={24} />
              </div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            
            <div className="stat-item animate-fade-in-right delay-850">
              <div className="stat-icon">
                <ThumbsUp size={24} />
              </div>
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element-1 animate-float"></div>
        <div className="floating-element-2 animate-float delay-500"></div>
        <div className="floating-element-3 animate-float delay-1000"></div>
      </div>
    </section>
  );
};

export default Hero;