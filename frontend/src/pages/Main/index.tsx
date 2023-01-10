import React, { useState, useEffect } from 'react';

import Pagination from './Pagination';
import PaginationSelector from './PaginationSelector';
import ResultUsers from './ResultUsers';

import { randomApi } from '../../services/api';

import './styles.css';

const MainPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(users.length / usersPerPage);
  const startIndex = currentPage * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);


  const getRandomUsers = async () => {
    const response = await randomApi();
    return setUsers(response.data.results);
  }

  const filterUsers = users.filter(user => user.login.username.toLowerCase().includes(search));

  useEffect(() => {
    getRandomUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(0)
  }, [usersPerPage]);


  return (
    <section className='main-page'>

      <div className="input-selector-wrapper">
        <input type="text" autoComplete="off" placeholder="Procure pelo nome do usuario..." onChange={e => setSearch(e.target.value.toLowerCase())} />

        <PaginationSelector usersPerPage={usersPerPage} setUsersPerPage={setUsersPerPage} />
      </div>

        <div className="render">

          {search !== '' ? <ResultUsers data={filterUsers} /> : <ResultUsers data={currentUsers} />}

          {currentUsers.length === 0 && <p>404 Not found</p>}

        {search === '' && <Pagination setCurrentPage={setCurrentPage} pages={pages} currentPage={currentPage} />}
        </div>
    </section>
  )
}

export default MainPage;