import { useForm } from 'react-hook-form';
import useTitle from '../hooks/useTitle';
import SectionTitle from '../components/SectionTitle';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

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

const AddToy = () => {
  const { user } = useContext(AuthContext);

  useTitle('Add Toy');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addToysHandler = (data) => {
    data.sellerName = user.displayName;
    data.sellerEmail = user.email;

    fetch('https://kids-kraft.vercel.app/toys/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('kidsKraft_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({ icon: 'success', title: 'New Toy Added' });
          reset();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='bg-slate-500 py-10'>
      <SectionTitle dark={true}>Add A New Toy</SectionTitle>
      <div className='container'>
        <form
          onSubmit={handleSubmit(addToysHandler)}
          className='border border-slate-900 rounded-md p-10'
        >
          <div className='md:grid grid-cols-3 gap-3'>
            {data.map((item, i) => (
              <Input key={i} item={item} register={register} errors={errors} />
            ))}
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToy;

const Input = ({ item, register, errors }) => {
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
          {...register(item.id, { required: true })}
          defaultValue=''
        >
          <option value=''>Must Choose One</option>
          {item?.options.map((op, i) => (
            <option key={i} value={op}>
              {op}
            </option>
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
        name={item.id}
        {...register(item.id, { required: true })}
        placeholder={item.label}
        step='any'
      />
    </div>
  );
};
