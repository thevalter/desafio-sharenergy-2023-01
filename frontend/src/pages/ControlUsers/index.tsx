import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';
import Form from './Form';
import Grid from './Grid';
import Modal from './Modal';

import { getUsers } from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

interface onEditInterface{
  name: string,
  email: string,
  phone: string,
  address: string,
  cpf: string,
  _id: string,
}

const UsersPage = () => {

  const [users, setUsers] = useState<Array<any>>([]);
  const [onEdit, setOnEdit] = useState<onEditInterface | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const getData = async () => {
    try {
      const response = await getUsers('/users');
      setUsers(response.data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [setUsers]);

  return (
    <div className='users-page'>

      <div className='new-btn'>
        Cadastrar novo usuario&nbsp;<FaPlusCircle onClick={toggleModal}/>
      </div>

      <Modal children={<Form toggleModal={toggleModal} onEdit={onEdit} setOnEdit={setOnEdit} getData={getData} />} modal={modal} toggleModal={toggleModal} setOnEdit={setOnEdit} />

      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} toggleModal={toggleModal}/>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  )
}

export default UsersPage;