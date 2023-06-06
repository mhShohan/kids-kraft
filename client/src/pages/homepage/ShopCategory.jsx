import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';

const ShopCategory = () => {
  const [loading, setLoading] = useState(true);
  const [toys, setToys] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://kids-kraft.vercel.app/toys/all');
      const data = await res.json();

      setToys(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className='bg-slate-800 py-16' id='show_category'>
      <SectionTitle dark={true}>Shop Now!</SectionTitle>
      <div className='container'>
        <Tabs>
          <TabList className='text-center text-xl font-bold'>
            <Tab>Marvel</Tab>
            <Tab>Star Wars</Tab>
            <Tab>DC Comic</Tab>
            <Tab>Transformers</Tab>
          </TabList>

          <TabPanel>
            <Category
              items={
                !loading && toys.filter((item) => item.subCategory === 'Marvel')
              }
            />
          </TabPanel>
          <TabPanel>
            <Category
              items={
                !loading &&
                toys.filter((item) => item.subCategory === 'Star Wars')
              }
            />
          </TabPanel>
          <TabPanel>
            <Category
              items={
                !loading &&
                toys.filter((item) => item.subCategory === 'DC Comic')
              }
            />
          </TabPanel>
          <TabPanel>
            <Category
              items={
                !loading &&
                toys.filter((item) => item.subCategory === 'Transformers')
              }
            />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default ShopCategory;

const Category = ({ items }) => {
  console.log(items);
  return (
    <div className='border border-zinc-600 rounded-md p-10 md:grid grid-cols-3 mt-5 gap-10'>
      {items.map((item) => (
        <SubCategory key={item._id} item={item} />
      ))}
    </div>
  );
};

const SubCategory = ({ item }) => {
  console.log(item);
  return (
    <div className='card'>
      <div className='w-48 h-[200px]'>
        <img
          src={item.picture}
          alt={item.name}
          className='w-full h-full object-contain'
        />
      </div>
      <div>
        <h1 className='font-bold text-center text-cyan-400 text-xl'>
          {item.name}
        </h1>
        <h2 className='font-extrabold text-3xl text-center text-cyan-400'>
          ${item.price.toFixed(2)}
        </h2>
        <h2 className='flex gap-3 items-center'>
          <ReactStarsRating
            id={Date.now()}
            value={item.rating}
            className='flex'
            isEdit={false}
            isHalf={true}
          />
          <span className='text-2xl text-yellow-300'>{item.rating}</span>
        </h2>
      </div>
      <Button>
        <Link to={`/all-toys/${item._id}`}>Show Details</Link>
      </Button>
    </div>
  );
};
