import React from 'react';

import { AuthContextProvider } from './common/auth/context/AuthProvider';

import Router from './views/Router';

export const App: React.FC = function() {
    return (
        <AuthContextProvider>
            <Router />
        </AuthContextProvider>
    );
};


export default App;