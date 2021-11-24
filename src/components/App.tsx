import React from 'react';
import { AuthContextProvider } from '../common/auth/context/AuthProvider';
import { AppRouter } from '../views/AppRouter';

export const App: React.FC = () => {

    return (
        <AuthContextProvider>
            <AppRouter />
        </AuthContextProvider>
    );
};
