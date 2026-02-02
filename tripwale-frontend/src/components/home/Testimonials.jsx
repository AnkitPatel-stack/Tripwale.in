import { testimonials } from '../../services/data';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real stories from travelers who experienced unforgettable journeys with TripWale.in
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-lg p-6 relative card-hover"
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-primary-100">
              <Quote size={40} />
            </div>

            {/* Rating */}
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < testimonial.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-700 mb-6 italic">
              "{testimonial.content}"
            </p>

            {/* User Info */}
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-primary-600 mb-2">4.8/5</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-primary-600 mb-2">10K+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-primary-600 mb-2">500+</div>
          <div className="text-gray-600">Destinations</div>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-primary-600 mb-2">98%</div>
          <div className="text-gray-600">Would Recommend</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Share Your Experience
        </button>
      </div>
    </section>
  );
};

export default Testimonials;