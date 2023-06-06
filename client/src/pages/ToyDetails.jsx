import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ReactStarsRating from 'react-awesome-stars-rating';

const ToyDetails = () => {
  const [loading, setLoading] = useState(true);
  const [toy, setToy] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://kids-kraft.vercel.app/toys/${id}`);
        const data = await res.json();
        setToy(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  if (loading) return <Loader dark={true} full={true} />;

  return (
    <div className='bg-slate-600 px-2 py-10 h-screen'>
      <div className='container'>
        {error && (
          <div>
            <h1 className='text-9xl text-center text-red-600'>
              No Toys Found!
            </h1>
          </div>
        )}
        {!error && toy && (
          <div className='md:flex text-2xl font-bold items-center py-10'>
            <div className='h-80 md:w-1/2 rounded-lg'>
              <img
                src={toy.picture}
                alt={toy.name}
                className='w-full h-80 object-contain rounded-lg opacity-75'
              />
            </div>
            <div className='md:w-1/2 text-cyan-200 mt-5 px-2'>
              <h1>
                Toy Name: <span className='font-semibold'>{toy.name}</span>
              </h1>
              <h1>
                Seller Name:{' '}
                <span className='font-semibold'>{toy.sellerName}</span>
              </h1>
              <h1>
                Seller Email:{' '}
                <span className='font-semibold'>{toy.sellerEmail}</span>
              </h1>
              <h1>
                Sub Category: <span className='font-semibold'>{toy.name}</span>
              </h1>
              <h1>
                Price: $
                <span className='font-semibold'>{toy.price.toFixed(2)}</span>
              </h1>
              <h1>
                Available Quantity:{' '}
                <span className='font-semibold'>{toy.availableQuantity}</span>
              </h1>
              <h2 className='flex gap-3 items-center'>
                Ratings:
                <ReactStarsRating
                  value={toy.rating}
                  className='flex'
                  isEdit={false}
                />
                <span className='text-2xl text-yellow-300'>
                  <span className='font-semibold'>{toy.rating}</span>
                </span>
              </h2>
              <p className='text-lg text-cyan-200 font-semibold'>
                Detail: {toy.detailDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToyDetails;
