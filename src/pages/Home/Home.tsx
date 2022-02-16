import { FC } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../common/auth/useAuth.hook";

import PlanetBlue from "../../assets/vectors/planet-blue.svg";

export const Home: FC = () => {
    const { user, logout } = useAuth();

    return (
        <>
            <PlanetBlue />
            <p>
                Hello universe!
            </p>
            {user?.nickname}
            <p>
                <Link to="/sign-in/1">Login Page</Link>
                <button onClick={() => logout()}>Logout</button>

            </p>
        </>
    );
};

export default Home;