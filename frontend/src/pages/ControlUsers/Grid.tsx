import React from 'react';

import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { deleteUsers } from '../../services/api';

interface ItemInterface{
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf: string,
    _id: string,
  }

  interface GridInterface{
    users: Array<any>,
    setUsers: React.Dispatch<React.SetStateAction<any[]>>,
    setOnEdit: React.Dispatch<React.SetStateAction<ItemInterface | null>>,
    toggleModal: VoidFunction,
  }
  

const Grid = ({ users, setUsers, setOnEdit, toggleModal }: GridInterface) => {

    const handleEdit = (item: ItemInterface) => {
        setOnEdit(item);
        toggleModal();
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteUsers(`/users/${id}`);
            const newArray = users.filter((user) => user._id !== id);
            setUsers(newArray);
            toast.success(`Usuario deletado com sucesso`);
        } catch (err: any) {
            toast.error(err);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Cpf</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((item) => (
                    <tr key={item._id}>
                        <td style={{ width: "auto" }}>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.cpf}</td>

                        <td className='button-container'>
                            <span className='button edit'>
                                <FaEdit onClick={() => handleEdit(item)} />
                            </span>
                            <span className='button remove'>
                                <FaTrash onClick={() => handleDelete(item._id)} />
                            </span>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}

export default Grid;