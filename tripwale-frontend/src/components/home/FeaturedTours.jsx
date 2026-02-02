import { tourPackages } from '../../services/data';
import { Star, MapPin, Clock, ChevronRight, Users, Calendar, Tag, Shield, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FeaturedTours = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const featuredTours = tourPackages.slice(0, 6);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'challenging': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <section className="section tours-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-content">
            <div className="section-icon">
              <Award size={32} />
            </div>
            <h2 className="section-title animate-fade-in-up">
              Featured <span className="text-gradient">Tour Packages</span>
            </h2>
            <p className="section-description animate-fade-in-up delay-200">
              Handpicked travel experiences with the best value and unforgettable memories.
            </p>
          </div>
          
          {/* Features Badges */}
          <div className="features-badges">
            <div className="feature-badge animate-scale-in delay-300">
              <Shield size={20} />
              <span>Trusted</span>
            </div>
            <div className="feature-badge animate-scale-in delay-400">
              <Tag size={20} />
              <span>Best Price</span>
            </div>
            <div className="feature-badge animate-scale-in delay-500">
              <Zap size={20} />
              <span>Instant Booking</span>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="tours-grid">
          {featuredTours.map((tour, index) => (
            <div
              key={tour.id}
              className={`tour-card animate-fade-in-up delay-${(index * 100) + 300}`}
              onMouseEnter={() => setHoveredCard(tour.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="tour-image-container">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="tour-image"
                />
                
                {/* Discount Badge */}
                {tour.discountPrice < tour.price && (
                  <div className="tour-discount-badge">
                    <span className="discount-text">
                      Save ₹{(tour.price - tour.discountPrice).toLocaleString()}
                    </span>
                    <span className="discount-percent">
                      {Math.round((1 - tour.discountPrice / tour.price) * 100)}% OFF
                    </span>
                  </div>
                )}
                
                {/* Difficulty Badge */}
                <div className="tour-difficulty" style={{ backgroundColor: getDifficultyColor(tour.difficulty) }}>
                  {tour.difficulty || 'Easy'}
                </div>
                
                {/* Quick View Overlay */}
                {hoveredCard === tour.id && (
                  <div className="tour-quick-view">
                    <Link 
                      to={`/tours/${tour.id}`}
                      className="btn btn-primary quick-view-btn"
                    >
                      Quick View
                    </Link>
                  </div>
                )}
              </div>

              {/* Tour Content */}
              <div className="tour-content">
                {/* Tour Header */}
                <div className="tour-header">
                  <div className="tour-title-wrapper">
                    <h3 className="tour-title">{tour.title}</h3>
                    <div className="tour-destination">
                      <MapPin size={16} />
                      <span>{tour.destination}</span>
                    </div>
                  </div>
                  
                  <div className="tour-rating">
                    <Star size={16} fill="currentColor" />
                    <span className="rating-number">{tour.rating}</span>
                    <span className="rating-count">({tour.reviews} reviews)</span>
                  </div>
                </div>

                {/* Tour Description */}
                <p className="tour-description">{tour.description}</p>

                {/* Tour Meta */}
                <div className="tour-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{tour.groupSize || '2-12 People'}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{tour.bestSeason?.join(', ') || 'Year Round'}</span>
                  </div>
                </div>

                {/* Tour Tags */}
                <div className="tour-tags">
                  {tour.tags.map((tag, idx) => (
                    <span key={idx} className="tour-tag">{tag}</span>
                  ))}
                </div>

                {/* Tour Highlights */}
                <div className="tour-highlights">
                  <div className="highlights-title">Highlights:</div>
                  <div className="highlights-list">
                    {tour.highlights?.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="highlight-item">
                        <span className="highlight-dot"></span>
                        <span>{highlight}</span>
                      </div>
                    )) || (
                      <>
                        <div className="highlight-item">
                          <span className="highlight-dot"></span>
                          <span>Guided sightseeing</span>
                        </div>
                        <div className="highlight-item">
                          <span className="highlight-dot"></span>
                          <span>Accommodation included</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Tour Footer */}
                <div className="tour-footer">
                  <div className="tour-pricing">
                    {tour.discountPrice < tour.price ? (
                      <div className="discount-pricing">
                        <div className="current-price">
                          ₹{tour.discountPrice.toLocaleString()}
                        </div>
                        <div className="original-price">
                          ₹{tour.price.toLocaleString()}
                        </div>
                        <div className="price-label">per person</div>
                      </div>
                    ) : (
                      <div className="regular-pricing">
                        <div className="current-price">
                          ₹{tour.price.toLocaleString()}
                        </div>
                        <div className="price-label">per person</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="tour-actions">
                    <Link
                      to={`/tours/${tour.id}`}
                      className="btn btn-primary tour-details-btn"
                    >
                      <span>View Details</span>
                      <ChevronRight size={18} />
                    </Link>
                    <button className="btn btn-outline tour-wishlist">
                      <Star size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="section-footer animate-fade-in-up delay-900">
          <Link to="/tours" className="btn btn-primary btn-lg view-all-btn">
            <span>Explore All Packages</span>
            <ChevronRight size={20} />
          </Link>
          
          <div className="tours-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Travelers Booked</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">4.8/5</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Shield size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;