import { Users, Target, Eye, Award, CheckCircle } from 'lucide-react';

const About = () => {
  const teamMembers = [
    { id: 1, name: 'Aarav Sharma', role: 'Founder & CEO', experience: '15+ years in tourism' },
    { id: 2, name: 'Neha Patel', role: 'Travel Director', experience: '12+ years experience' },
    { id: 3, name: 'Rohan Singh', role: 'Operations Head', experience: '10+ years in logistics' },
    { id: 4, name: 'Priya Desai', role: 'Customer Success', experience: '8+ years in hospitality' },
  ];

  const milestones = [
    { year: '2015', event: 'TripWale.in founded with 5 destinations' },
    { year: '2017', event: 'Expanded to 50+ destinations across India' },
    { year: '2019', event: 'Launched international tour packages' },
    { year: '2021', event: 'Served 10,000+ happy customers' },
    { year: '2023', event: 'Recognized as "Best Travel Startup"' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-500 to-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About TripWale.in</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted travel companion since 2015, creating unforgettable journeys across India and beyond.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                TripWale.in was born from a simple idea: travel should be accessible, enjoyable, 
                and hassle-free for everyone. What started as a small travel blog in 2015 has 
                grown into one of India's most trusted travel platforms.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Aarav Sharma, noticed that while there were many travel options 
                available, few provided the perfect blend of quality, affordability, and 
                personalized service. Thus, TripWale.in was created to fill this gap.
              </p>
              <div className="flex items-center space-x-2 text-primary-600">
                <CheckCircle size={20} />
                <span className="font-semibold">10,000+ satisfied customers</span>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team" 
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to making travel experiences memorable and accessible to all.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <Target className="text-primary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To simplify travel planning and provide exceptional experiences that exceed 
                customer expectations. We aim to make every journey memorable through 
                personalized service, competitive pricing, and attention to detail.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-6">
                <Eye className="text-secondary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become India's most loved travel brand, recognized for innovation, 
                reliability, and creating life-enriching travel experiences. We envision 
                a world where travel brings people closer and creates lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="text-primary-600" size={32} />
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate travel experts dedicated to creating your perfect journey.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                      <Users size={40} className="text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="text-primary-600" size={32} />
              <h2 className="text-3xl font-bold">Our Journey</h2>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-primary-600 rounded-full z-10"></div>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">No hidden costs, clear communication, and honest recommendations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">Customer First</h3>
              <p className="text-gray-600">Every decision is made with our customers' best interests in mind.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">Striving for perfection in every journey we curate.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;