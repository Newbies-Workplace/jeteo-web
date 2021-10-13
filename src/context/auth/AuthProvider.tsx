import React, { createContext } from 'react';
import { AuthContextInterface, DefaultAuthContext } from "./AuthContext.interface";


export const AuthContext = createContext<AuthContextInterface>(DefaultAuthContext);

export const AuthProvider: React.FC = ({ children }) => {

    const isAuth = true;

    const getUserData = async () => {
        return { name: 'test' };
    }

    const login = async () => {
        return true;
    }

    const logout = async () => {
        return true;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                getUserData,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}