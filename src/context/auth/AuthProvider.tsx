import React, { createContext } from 'react';
import { AuthContextInterface, DefaultAuthContext } from "./AuthContext.interface";


export const AuthContext = createContext<AuthContextInterface>(DefaultAuthContext);

export const AuthProvider = () => {

    const isAuth = true;

    const getUserData = async () => {
        return {};
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

        </AuthContext.Provider>
    )
}