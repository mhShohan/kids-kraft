import useTitle from '../hooks/useTitle';

const data = [
  {
    id: 1,
    qus: 'What is an access token and refresh token? How do they work and where should we store them on the client-side?',
    ans: 'An access token is a type of credential used in authentication systems to access to protected resources. It serves as proof of authentication and authorization, allowing a client  to access specific resources or perform certain actions. And refresh token is a credential used in authentication systems to obtain a new access token when the current access token expires. It provides a way to extend the validity of an access token without requiring the user to re-authenticate. Access token and refresh token should store in localStorage or cookie in browser. When we login in a this token save in localStorage or cookie. And when we revisit the site then saved token verify the user',
  },
  {
    id: 2,
    qus: 'Compare SQL and NoSQL databases?',
    ans: 'SQL means Structured query language. SQL databases use a structured data model based on tables with predefined schemas. The data is organized into rows and columns, and the relationships between tables are established using foreign keys. On the other hand  NoSQL databases use various data models like key-value, document, columnar, or graph. They provide flexibility in organizing and storing data without predefined schemas or relationships.',
  },
  {
    id: 3,
    qus: 'What is express js? What is Nest JS?',
    ans: 'ExpressJS and NestJS both are nodeJS framework. Express.js is a lightweight framework for Node.js. It provides a simple and flexible way to build web applications and APIs by offering a set of features and tools that simplify the development process. On the Other hand NestJS is a framework for building efficient, scalable, and maintainable server-side applications using TypeScript. It is built on top of Node.js and leverages modern JavaScript features, design patterns, and architecture principles.',
  },
  {
    id: 4,
    qus: 'What is MongoDB aggregate and how does it work?',
    ans: ' MongoDB, the aggregate operation is used to perform advanced data processing and analysis tasks on the data stored in a collection. It allows you to perform various operations, such as filtering, grouping, sorting, transforming, and aggregating data, in a single query. The aggregate operation works by processing data through a pipeline of stages. Each stage performs a specific operation on the input data and passes the transformed data to the next stage in the pipeline. The stages are applied sequentially, allowing you to shape and manipulate the data as needed.',
  },
];

const Blogs = () => {
  useTitle('Blogs');

  return (
    <div className='bg-slate-400 py-10'>
      <div className='container'>
        {data.map((item) => (
          <div
            key={item.id}
            className='border border-zinc-800 p-5 m-5 rounded-md'
          >
            <h1 className='text-3xl'>
              <span className='font-bold'>Q{item.id}: </span>
              {item.qus}
            </h1>
            <h1 className='text-2xl'>
              <span className='font-bold'>Ans: </span>
              {item.ans}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
