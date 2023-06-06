import useTitle from '../../hooks/useTitle';
import AboutUsSection from './AboutUs';
import Banner from './Banner';
import ContactUs from './ContactUs';
import Gallery from './Gallery';
import ShopCategory from './ShopCategory';
import './home.css';

const Home = () => {
  useTitle('Home');

  return (
    <div>
      <Banner />
      <Gallery />
      <ShopCategory />
      <AboutUsSection />
      <ContactUs />
    </div>
  );
};

export default Home;
