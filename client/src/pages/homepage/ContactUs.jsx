import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section className='bg-slate-800 py-16'>
      <div className='container mx-auto px-2'>
        <div className='max-w-4xl mx-auto text-center'>
          <SectionTitle dark={true}>Contact Us</SectionTitle>
          <p className='text-lg text-gray-300 mb-8'>
            We'd love to hear from you! If you have any questions, feedback, or
            inquiries, please feel free to get in touch with us.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Your Name'
              />
            </div>
            <div className='mb-4'>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                placeholder='Email Address'
              />
            </div>
            <div className='mb-4'>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Your Message'
                rows={4}
              />
            </div>
            <Button>Send Massage</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
