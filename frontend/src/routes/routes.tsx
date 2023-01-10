import React, { useContext } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../contexts/auth';


import LoginPage from '../pages/Login';
import MainPage from '../pages/Main';
import CatsPage from '../pages/Cats';
import DogsPage from '../pages/Dogs';
import UsersPage from '../pages/ControlUsers';
import Navbar from '../components/Navbar';

const AppRoutes = () => {

    const Private: React.FC<any> = ({ children}) => {
        const { authenticated } = useContext(AuthContext);

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Private><Navbar/></Private>}>
                        <Route path="/" element={<Private><MainPage /></Private>} />
                        <Route path="/cats" element={<Private><CatsPage /></Private>} />
                        <Route path="/dogs" element={<Private><DogsPage /></Private>} />
                        <Route path="/users" element={<Private><UsersPage /></Private>} />
                    </Route>
                </Routes>
            </AuthProvider>

        </Router>
    )
}

export default AppRoutes;