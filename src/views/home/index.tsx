import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../common/auth/context/useAuth.hook';

import Planet from '../../assets/images/planet.svg';


export const HomeView: React.FC = () => {

    const { user, logout } = useAuth()
    console.log(user);
    return (
        <>
            <Planet />
            <p>
                Hello universe!
            </p>
            {user?.nickname}
            <p>
                <Link to="/auth/signin">Login Page</Link>
                <button onClick={() => logout()}>Logout</button>

            </p>
        </>
    );
};
