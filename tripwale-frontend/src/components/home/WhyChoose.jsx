import { Shield, Award, Headphones, Tag } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Trust & Safety',
      description: 'Verified hotels and service providers with 24/7 emergency support.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Award size={32} />,
      title: 'Best Price Guarantee',
      description: 'We guarantee the lowest prices or we will match the difference.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      description: 'Our travel experts are available round the clock to assist you.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <Tag size={32} />,
      title: 'Flexible Packages',
      description: 'Customize your trip exactly the way you want it.',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Travelers' },
    { value: '500+', label: 'Destinations' },
    { value: '24/7', label: 'Support' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TripWale.in?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're committed to making your travel experience seamless, memorable, and affordable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center card-hover"
          >
            <div className={`inline-flex p-4 rounded-2xl mb-4 ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-linear-to-r from-primary-500 to-secondary-600 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="text-xl font-bold mb-2">Choose Your Trip</h4>
            <p className="text-gray-600">Browse packages or customize your own itinerary</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="text-xl font-bold mb-2">Book & Confirm</h4>
            <p className="text-gray-600">Secure booking with flexible payment options</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="text-xl font-bold mb-2">Travel & Enjoy</h4>
            <p className="text-gray-600">Relax while we handle all the details</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;