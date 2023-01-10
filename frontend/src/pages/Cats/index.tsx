import React, { useState, useEffect } from 'react';

import './style.css';

const CatsPage = () => {

  let count: number[] = [];

  const [code, setCode] = useState<string>('');

  for (let i = 0; i < 502; i++) {
    count.push(i);
  }

  useEffect(() => {

  }, []);

  return (
    <div className='cats-page'>
      <div className="select-wrapper">
        <span>Select a status code</span>
        <select value={code} onChange={e => setCode(e.target.value)}>
          {count.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="img-wrapper">
        <img src={`https://httpcats.com/${code}.jpg`} alt="" onError={e => e.currentTarget.src = 'https://httpcats.com/404.jpg'} />
      </div>
    </div>
  )
}

export default CatsPage;