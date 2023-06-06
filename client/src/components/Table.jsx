import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from './Loader';

const Table = ({ toys, myToy, setUpdate, loading }) => {
  const deleteToy = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFetch(id);
      }
    });
  };

  const deleteFetch = (id) => {
    fetch(`https://kids-kraft.vercel.app/toys/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('kidsKraft_token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          setUpdate((p) => !p);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className='overflow-x-scroll'>
      <table className='w-full bg-slate-500 text-center'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Index</th>
            <th className='py-2 px-4 border-b'>Seller</th>
            <th className='py-2 px-4 border-b'>Toy Name</th>
            <th className='py-2 px-4 border-b'>Sub-category</th>
            <th className='py-2 px-4 border-b'>Price</th>
            <th className='py-2 px-4 border-b'>Quantity</th>
            <th className='py-2 px-4 border-b'></th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            toys?.map((toy, i) => (
              <tr key={i}>
                <td className='py-2 px-4 border-b'>{i + 1}</td>
                <td className='py-2 px-4 border-b'>{toy.sellerName}</td>
                <td className='py-2 px-4 border-b'>{toy.name}</td>
                <td className='py-2 px-4 border-b'>{toy.subCategory}</td>
                <td className='py-2 px-4 border-b'>${toy.price}</td>
                <td className='py-2 px-4 border-b'>{toy.availableQuantity}</td>
                <td className='py-2 px-4 border-b'>
                  <button className='mx-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                    <Link to={`/all-toys/${toy._id}`}>View Details</Link>
                  </button>
                  {myToy && (
                    <>
                      <button className='mx-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded'>
                        <Link to={`/update-toy/${toy._id}`}>Edit</Link>
                      </button>
                      <button
                        onClick={() => deleteToy(toy._id)}
                        className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded'
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
