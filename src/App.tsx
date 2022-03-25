import React from 'react';
import { AuthContextProvider } from './common/auth/AuthContext';
import { AppRouter } from './views/AppRouter';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});

export const App: React.FC = () => {

    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <AppRouter />
            </AuthContextProvider>
        </ApolloProvider>
    );
};
