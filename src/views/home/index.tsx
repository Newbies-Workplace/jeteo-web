import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../common/auth/context/useAuth.hook';

import PlanetBlue from '../../assets/vectors/planet-blue.svg';


export const HomePage: React.FC = () => {

    const { user, logout } = useAuth()

    return (
        <>
            <PlanetBlue />
            <p>
                Hello universe!
            </p>
            {user?.nickname}
            <p>
                <Link to="/register/1">Login Page</Link>
                <button onClick={() => logout()}>Logout</button>

            </p>
        </>
    );
};

export default HomePage;