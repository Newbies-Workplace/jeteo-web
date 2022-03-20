import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../common/auth/useAuth.hook';

import Planet from '../../assets/images/planet.svg';
import {BaseButton} from "../../components/containers/BaseButton/BaseButton";


export const HomeView: React.FC = () => {

    const { user, logout } = useAuth()

    return (
        <>
            <Planet />
            <BaseButton onClick={() => alert("Works!")}>
                SASS Btn Text
            </BaseButton>
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
