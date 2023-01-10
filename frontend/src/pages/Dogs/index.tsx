import React, { useState, useEffect } from 'react';

import { randomDogs } from '../../services/api';

import './styles.css';

const DogsPage = () => {

  const [dog, setDog] = useState<string>('');

  const getDog = async () => {
    const response = await randomDogs();
    setDog(response.data.url);
  }

  useEffect(() => {
    getDog();
  }, [])

  return (
    <div className='dogs-page'>
      <button className='refresh' onClick={getDog}>Atualizar</button>
      <div className='img-wrapper'>
        <img src={dog} alt="" onError={e => e.currentTarget.src = 'https://random.dog/602c507b-ebf1-436f-8e44-ba61af4c9241.gif'} />
      </div>
    </div>
  )
}

export default DogsPage;