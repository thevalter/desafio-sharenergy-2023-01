import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';

interface AuthContextInterface {
    authenticated: String | null,
    user: String | null,
    login: Promise<VoidFunction>,
    logout: VoidFunction,
}

export const AuthContext = createContext<AuthContextInterface | any>(null);

export const AuthProvider = ({ children } : {children: JSX.Element}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');

        if (user && token) {
            setUser(JSON.parse(user));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
    }, []);

    const login = async (username: string, password: string) => {
        
        await api.post('/login', {username, password}).then(response => {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            sessionStorage.setItem('token', response.data.token);
    
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    
            setUser(response.data.user);
    
            navigate('/');           
        }).catch(() => {
            toast.error('Usuario ou senha invalidos')
        });
 
    }

    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: sessionStorage.getItem('token'),
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}