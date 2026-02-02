import { popularDestinations } from '../../services/data';
import { MapPin, Star, ArrowRight, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const PopularDestinations = () => {
  return (
    <section className="section destinations-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title animate-fade-in-up">
            Popular <span className="text-gradient">Destinations</span>
          </h2>
          <p className="section-description animate-fade-in-up delay-200">
            Discover the most sought-after travel spots in India, each offering unique experiences and memories.
          </p>
        </div>

        <div className="destinations-grid">
          {popularDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`destination-card animate-fade-in-up delay-${(index * 100) + 300}`}
            >
              <div className="destination-image-wrapper">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="destination-image"
                />
                <div className="destination-overlay"></div>
                
                {/* Badge */}
                <div className="destination-badge">
                  <span>Popular</span>
                </div>
                
                {/* Rating */}
                <div className="destination-rating">
                  <Star size={16} fill="currentColor" />
                  <span>{destination.rating || 4.5}+</span>
                </div>
              </div>
              
              <div className="destination-content">
                <div className="destination-header">
                  <div className="destination-info">
                    <h3 className="destination-name">{destination.name}</h3>
                    <p className="destination-description">{destination.description}</p>
                  </div>
                  <div className="destination-price">
                    <span className="price-from">From</span>
                    <span className="price-amount">₹{destination.startingPrice?.toLocaleString() || '7,999'}</span>
                  </div>
                </div>
                
                <div className="destination-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{destination.packages} packages</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>2-12 people</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Year-round</span>
                  </div>
                </div>
                
                <div className="destination-tags">
                  {destination.tags?.map((tag, idx) => (
                    <span key={idx} className="destination-tag">{tag}</span>
                  )) || ['Beach', 'Adventure', 'Culture'].map((tag, idx) => (
                    <span key={idx} className="destination-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="destination-actions">
                  <Link 
                    to={`/tours?destination=${destination.name.toLowerCase()}`}
                    className="btn btn-outline destination-explore"
                  >
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </Link>
                  <button className="btn btn-primary destination-book">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer animate-fade-in-up delay-900">
          <Link to="/tours" className="btn btn-primary btn-lg view-all-btn">
            <span>View All Destinations</span>
            <ArrowRight size={20} />
          </Link>
          
          <div className="stats-cards">
            <div className="stats-card">
              <div className="stats-number">50+</div>
              <div className="stats-label">Countries</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">500+</div>
              <div className="stats-label">Destinations</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">10K+</div>
              <div className="stats-label">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;