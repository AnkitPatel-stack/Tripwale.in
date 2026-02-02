import Hero from '../components/home/Hero';
import PopularDestinations from '../components/home/PopularDestinations';
import FeaturedTours from '../components/home/FeaturedTours';
import WhyChoose from '../components/home/WhyChoose';
import Testimonials from '../components/home/Testimonials';
const Home = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PopularDestinations />
        <FeaturedTours />
        <WhyChoose />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;