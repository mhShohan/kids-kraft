import loader from '../assets/loader.svg';

const Loader = ({ dark, full }) => {
  return (
    <div
      className={`center ${full ? 'h-screen' : 'py-10'} ${
        dark ? 'bg-slate-800' : 'bg-slate-300'
      }`}
    >
      <div className='w-80 h-80'>
        <img src={loader} alt='loader' className='w-full' />
      </div>
    </div>
  );
};

export default Loader;
