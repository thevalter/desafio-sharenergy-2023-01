import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { updateUsers, createUsers } from '../../services/api';

interface onEditInterface{
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf: string,
    _id: string,
  }

interface FormInterface {
    toggleModal: VoidFunction,
    onEdit: onEditInterface | null,
    setOnEdit: React.Dispatch<React.SetStateAction<onEditInterface | null>>,
    getData: VoidFunction,
}

const Form = ({ toggleModal, onEdit, setOnEdit, getData }: FormInterface) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [cpf, setCpf] = useState("");
    const [id, setId] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        handleClick();
    }

    const handleClick = async () => {

        if (onEdit) {

            try {
                const response = await updateUsers(`users/${id}`, {
                    name,
                    email,
                    phone,
                    address,
                    cpf,
                });

                if (response.status === 200) {
                    toast.success(`Usuario atualizado com sucesso`)
                    setOnEdit(null);
                    getData();
                }
            } catch (err) {
                toast.error(`Nao foi possivel editar o usuario. Usuario, email ou cpf ja existem.`);
            }

        }

        if(!onEdit){
            try {
                const response = await createUsers('/users', {
                    name,
                    email,
                    phone,
                    address,
                    cpf,
                });

                if (response.status === 201) {
                    toast.success(`Usuario cadastrado com sucesso`)
                    setOnEdit(null);
                    getData();
                }
            } catch (err) {
                toast.error(`Nao foi possivel cadastrar o usuario. Usuario, email ou cpf ja existem.`);
            }
        }

        return toggleModal();
    }

    useEffect(() => {
        if (onEdit) {
            setName(onEdit.name);
            setEmail(onEdit.email);
            setPhone(onEdit.phone);
            setAddress(onEdit.address);
            setCpf(onEdit.cpf);
            setId(onEdit._id);
        }
    }, []);


    return (
        <form onSubmit={handleSubmit} className='modal-form'>
            <label htmlFor="name">Nome</label>
            <input value={name} type="text" name="name" onChange={e => setName(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input value={email} type="email" name="email" onChange={e => setEmail(e.target.value)} />

            <label htmlFor="telefone">Telefone</label>
            <input value={phone} type="text" name="phone" onChange={e => setPhone(e.target.value)} />

            <label htmlFor="address">Endereço</label>
            <input value={address} type="text" name="address" onChange={e => setAddress(e.target.value)} />

            <label htmlFor="cpf">Cpf</label>
            <input value={cpf} type="text" name="cpf" onChange={e => setCpf(e.target.value)} />

            <button type="submit" onCanPlay={handleSubmit}>Salvar</button>
        </form>
    )
}

export default Form;