import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import Marquee from 'react-fast-marquee';

const data = [
  { id: 1, img: '/assets/gallery/iron.jpg' },
  { id: 2, img: '/assets/gallery/cap.jpg' },
  { id: 3, img: '/assets/gallery/hulk.jpg' },
  { id: 5, img: '/assets/gallery/spider.jpg' },
  { id: 6, img: '/assets/gallery/prime.jpg' },
  { id: 7, img: '/assets/gallery/ant.jpg' },
  { id: 8, img: '/assets/gallery/panther.jpg' },
  { id: 9, img: '/assets/gallery/images1.jpg' },
  { id: 10, img: '/assets/gallery/images2.jpg' },
  { id: 11, img: '/assets/gallery/images3.jpg' },
];

const Gallery = () => {
  return (
    <section className='p-10 bg-slate-300'>
      <div className='container'>
        <SectionTitle>Toys Gallery</SectionTitle>
        <div className='pb-10'>
          <Marquee>
            {data.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

const Item = ({ item }) => {
  return (
    <div className='w-40 mx-5'>
      <img
        src={item.img}
        alt='Hero'
        className='w-full rounded object-contain opacity-80'
      />
    </div>
  );
};
