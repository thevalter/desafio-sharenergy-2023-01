import React from 'react';

interface ResultUsersInterface{
    data: any[]
}

const ResultUsers = ({ data } : ResultUsersInterface) => {
  return (
    <div className='results'>
      {data?.map((item, index) => (
        <div key={index} className='user-container'>
          <img src={item.picture.large} alt={`${item.name.first} ${item.name.last}`} />
          <div>
            <p>Name: {item.name.first} {item.name.last}</p>
            <p>Email: {item.email}</p>
            <p>Username: {item.login.username}</p>
            <p>Age: {item.dob.age}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResultUsers