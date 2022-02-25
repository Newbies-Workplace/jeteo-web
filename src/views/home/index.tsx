import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../common/auth/useAuth.hook';

import Planet from '../../assets/images/planet.svg';
import {LectureCard} from "../../components/containers/LectureCard/LectureCard";

import exampleimg from '../../assets/images/photos/example_flowers.png'


export const HomeView: React.FC = () => {

    const { user, logout } = useAuth()

    return (
        <>
            <Planet />
            <p>
                Hello universe!
            </p>
            <LectureCard
                id="975a6fa7-dfae-432b-9e8b-623f356b73a1"
                title="To się powinno ruszać?"
                subtitle="Biologiczna analiza whopperflowers"
                startDate={new Date("2022-02-24 20:08:42.000")}
                image={exampleimg}
                locationName={"online"}
            />
            {user?.nickname}
            <p>
                <Link to="/auth/signin">Login Page</Link>
                <button onClick={() => logout()}>Logout</button>

            </p>
        </>
    );
};
