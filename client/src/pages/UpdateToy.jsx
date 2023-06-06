import { useForm } from 'react-hook-form';
import useTitle from '../hooks/useTitle';
import SectionTitle from '../components/SectionTitle';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const data = [
  {
    id: 'name',
    type: 'text',
    label: 'Toy Name',
    name: 'name',
  },
  {
    id: 'picture',
    type: 'text',
    label: 'Picture URL',
    name: 'picture',
  },
  {
    id: 'subCategory',
    type: 'select',
    label: 'Sub Category',
    name: 'subCategory',
    options: ['Marvel', 'DC Comic', 'Star Wars', 'Transformers'],
  },
  {
    id: 'price',
    type: 'number',
    label: 'Price ($)',
    name: 'price',
  },
  {
    id: 'rating',
    type: 'number',
    label: 'Rating',
    name: 'rating',
  },
  {
    id: 'availableQuantity',
    type: 'number',
    label: 'Available Quantity',
    name: 'availableQuantity',
  },
  {
    id: 'detailDescription',
    type: 'textarea',
    label: 'Detail Description',
    name: 'detailDescription',
  },
];

const UpdateToy = () => {
  const navigate = useNavigate();

  useTitle('Add Toy');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [toy, setToy] = useState(null);

  const updateToysHandler = (data) => {
    fetch(`https://kids-kraft.vercel.app/toys/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('kidsKraft_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({ icon: 'success', title: 'Toy Updated' });
          reset();
          navigate('/my-toys', { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  if (loading) return <Loader />;

  return (
    <div className='bg-slate-500 py-10'>
      <SectionTitle dark={true}>Update Toy</SectionTitle>
      <div className='container'>
        <form
          onSubmit={handleSubmit(updateToysHandler)}
          className='border border-slate-900 rounded-md p-10'
        >
          <div className='md:grid grid-cols-3 gap-3'>
            {toy &&
              data.map((item, i) => (
                <Input
                  value={toy[item.name]}
                  key={i}
                  item={item}
                  register={register}
                  errors={errors}
                />
              ))}
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateToy;

const Input = ({ item, register, errors, value }) => {
  if (item.type === 'select') {
    return (
      <div className='mb-4'>
        <label className='block text-white text-xl font-bold' htmlFor={item.id}>
          {item.label}*
        </label>
        <select
          className={`${
            errors[item.name] && 'border-red-600'
          } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id={item.id}
          name={item.id}
          defaultValue={value}
          {...register(item.id, { required: true })}
        >
          <option value=''>Must Choose One</option>
          {item?.options.map((op) => (
            <option value={op}>{op}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className='mb-4'>
      <label className='block text-white text-xl font-bold' htmlFor={item.id}>
        {item.label}*
      </label>
      <input
        className={`${
          errors[item.name] && 'border-red-600'
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id={item.id}
        type={item.type}
        defaultValue={value}
        name={item.id}
        {...register(item.id, { required: true })}
        placeholder={item.label}
        step='any'
      />
    </div>
  );
};
