import React, { createContext, useState, useContext } from 'react';
import axiosInstance from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
 export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
    const token = localStorage.getItem('access_token');
    return token ? jwtDecode(token) : null
    });

    const login = async (username, password) => {
        const response = await axiosInstance.post('/token/',{
              username,
              password
        });
        localStorage.setItem('access_token' , response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        const decodeUser = jwtDecode(response.data.access);
        setUser(decodeUser)
    }


const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
}; 
return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
);
 };

export const useAuth =() => useContext(AuthContext)
