import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../common/auth/useAuth.hook';

import Planet from '../../assets/images/planet.svg';

import {BaseButton} from "../../components/containers/BaseButton/BaseButton";
import {EventList} from "../../components/ui/EventList/EventList";


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

            <div style={{backgroundColor: '#f6f6f6'}}>
                <EventList/>
            </div>
            {user?.nickname}
            <p>
                <Link to="/auth/signin">Login Page</Link>
                <button onClick={() => logout()}>Logout</button>

            </p>
        </>
    );
};
