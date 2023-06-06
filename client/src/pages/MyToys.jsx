import { useContext, useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import Table from '../components/Table';
import useTitle from '../hooks/useTitle';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthProvider';

const MyToys = () => {
  const { loading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toys, setToys] = useState(null);
  const [update, setUpdate] = useState(true);

  useTitle('My Toys');

  console.log(toys);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://kids-kraft.vercel.app/my-toys', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('kidsKraft_token')}`,
        },
      });
      const data = await res.json(res);

      if (Array.isArray(data)) {
        setToys(data);
      }
      setIsLoading(false);
    })();
  }, [update]);

  if (isLoading) return <Loader />;

  return (
    <div className='bg-slate-700 py-10'>
      <div className='container'>
        <SectionTitle dark={true}>My Toys List</SectionTitle>
        {!(isLoading || loading) && toys && (
          <Table
            toys={toys}
            myToy={true}
            setUpdate={setUpdate}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default MyToys;
