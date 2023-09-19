import React from 'react';

import laodPic from '../static/picture/load.gif'

const Loading = () => {
  return (
    <section className='load'>
      <img src={laodPic} className='loadPic' alt='load' />
    </section>
  );
};

export default Loading;
