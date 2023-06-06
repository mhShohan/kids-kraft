import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <main className='mt-20'>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;
