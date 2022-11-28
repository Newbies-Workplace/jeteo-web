import React from 'react';
import { AuthContextProvider } from './contexts/auth/AuthContext';
import { AppRouter } from './views/AppRouter';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {

    return (
        <AuthContextProvider>
            <ToastContainer
                position={'bottom-right'} />

            <AppRouter />
        </AuthContextProvider>
    );
};
