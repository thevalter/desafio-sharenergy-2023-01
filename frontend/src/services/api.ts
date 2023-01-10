import axios from 'axios';

interface UsersInterface {
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf: string,
}

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const randomApi: any = axios.create({
    baseURL: 'https://randomuser.me/api/?results=40&seed=abc',
});

export const randomDogs: any = axios.create({
    baseURL: 'https://random.dog/woof.json',
});

export const getUsers = async (url: string) => {
    return api.get(url);
};

export const deleteUsers = async (url: string) => {
    return api.delete(url);
};

export const updateUsers = async (url: string, {name, email, phone, address, cpf}: UsersInterface) => {
    return api.put(url, {name, email, phone, address, cpf});
};
export const createUsers = async (url: string, {name, email, phone, address, cpf}: UsersInterface) => {
    return api.post(url, {name, email, phone, address, cpf});
};