import React from 'react';
import { AuthContextProvider } from './contexts/auth/AuthContext';
import { AppRouter } from './views/AppRouter';

export const App: React.FC = () => {

    return (
        <AuthContextProvider>
            <AppRouter />
        </AuthContextProvider>
    );
};
