import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';

const AboutUsSection = () => {
  return (
    <section className='bg-slate-300 py-16'>
      <div className='container mx-auto px-2'>
        <div className='max-w-4xl mx-auto text-center mb-6'>
          <SectionTitle>About Us</SectionTitle>
          <p className='text-lg text-gray-600 mb-8'>
            We are a leading online toy store dedicated to providing
            high-quality action figures and toys for all ages. Our mission is to
            bring joy, imagination, and endless fun to children and collectors
            alike.
          </p>
          <p className='text-lg text-gray-600'>
            With a wide selection of action figures from popular franchises,
            including superheroes, sci-fi, movie characters, and more, we strive
            to offer the best toys that inspire creativity and ignite the
            imagination of our customers.
          </p>
          <br />
          <Button>More Details</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
