import Header from '../components/Home/Header';
import HeroSection from '../components/Home/HeroSection';
import PartnersSection from '../components/Home/PartnersSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import Footer from '../components/Home/Footer';

const HomePage = () => {
  return (
    <div className='mx-4'>
      <Header />
      <HeroSection />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
