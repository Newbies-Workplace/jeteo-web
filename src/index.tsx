import React from 'react';
import { render } from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

import { App } from './components/App';

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});


import './index.css';

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
