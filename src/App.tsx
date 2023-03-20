import React from 'react';
import { AuthContextProvider } from './contexts/auth/AuthContext';
import { AppRouter } from './views/AppRouter';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import isBettwen from 'dayjs/plugin/isBetween';
import 'dayjs/locale/pl';


export const App: React.FC = () => {

    dayjs.locale('pl')
    dayjs.extend(isBettwen)

    return (
        <AuthContextProvider>
            <ToastContainer
                position={'top-right'} />

            <AppRouter />
        </AuthContextProvider>
    );
};
