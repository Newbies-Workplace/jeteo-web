import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { AppRouter } from '../views/AppRouter';


export const App: React.FC = () => {

    return (
        <AppRouter />
    )
}