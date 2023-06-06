import useTitle from '../../hooks/useTitle';
import Table from '../../components/Table';
import SectionTitle from '../../components/SectionTitle';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

const AllToys = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [toys, setToys] = useState(null);
  const [update, setUpdate] = useState(true);

  useTitle('All Toys');

  const totalPages = Math.ceil(total / limit);

  const pageNumbers = [...Array(totalPages).keys()];

  const handleSearch = () => {
    setSearchQuery(searchText);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(
        `https://kids-kraft.vercel.app/toys?sort=${sort}&search=${searchQuery}&page=${currPage}&limit=${limit}`
      );
      const data = await res.json();

      setToys(data.toys);
      setTotal(data.total);
      setLoading(false);
    })();
  }, [sort, searchQuery, currPage, limit]);

  if (loading) return <Loader dark={true} />;

  return (
    <div className='bg-slate-700 py-10'>
      <div className='container'>
        <SectionTitle dark={true}>All Toys List</SectionTitle>
        <div>
          <div className='flex justify-between gap-10 m-2 mb-5'>
            <div className='md:flex gap-3'>
              <input
                type='text'
                value={searchText}
                className='shadow m-1 border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='search by Toy name'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className='shadow m-1 border-none rounded py-1 px-3 text-white font-semibold bg-cyan-500'
              >
                Search
              </button>
            </div>
            <div className='md:flex gap-5'>
              <select
                defaultValue=''
                className='shadow m-1 border rounded w-full py-1 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onChange={(e) => setSort(e.target.value)}
              >
                <option value=''>Sort By Price</option>
                <option value='1'>Low To High</option>
                <option value='-1'>High To low</option>
              </select>
              <select
                defaultValue=''
                className='shadow m-1 border rounded w-full py-1 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value=''>View Per Page</option>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='29'>20</option>
              </select>
            </div>
          </div>
          {!loading && toys && (
            <Table toys={toys} setUpdate={setUpdate} loading={loading} />
          )}
        </div>
        <div className='text-center'>
          {pageNumbers.map((item, i) => (
            <button
              className='bg-blue-500 hover:bg-blue-300 hover:text-zinc-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline my-5 mx-1'
              key={i}
              onClick={() => setCurrPage(i)}
            >
              {item + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllToys;
