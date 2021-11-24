import React from "react";
import { render as renderReact, waitFor, screen, act } from "@testing-library/react";

import { AuthContextProvider } from '../context/AuthProvider';
import { useAuth } from "../context/useAuth.hook";
import { AuthContextInterface } from "../context/AuthContext";
import MockAxios from "jest-mock-axios";

import authRes from './authResponse.json';
import userEvent from "@testing-library/user-event";

describe('Authorization Contect', () => {

    let testContext: AuthContextInterface | null = null;


    afterEach(() => {
        testContext = null;
    })

    beforeEach(() => {

        const ExampleComponent: React.FC = () => {

            const auth = useAuth();

            testContext = auth;

            const handleLogin = () =>
                auth.auth("fake", "2137*****420***69");

            const handleLogout = () =>
                auth.logout();


            return (
                <>
                    <button
                        data-testid="login"
                        onClick={handleLogin}>
                        login
                    </button>
                    <button
                        data-testid="logout"
                        onClick={handleLogout}>
                        logout
                    </button>
                    <div data-testid="user">
                        {auth.user?.id && <span data-testid="id">
                            {auth.user.id}
                        </span>}
                        {auth.user?.nickname && <span data-testid="nickname">
                            {auth.user.nickname}
                        </span>}
                    </div>
                    <div data-testid="options">

                    </div>
                </>
            );
        }

        renderReact(
            <ExampleComponent />
            , {
                wrapper: AuthContextProvider
            });
    })

    it('should login', async () => {
        expect(testContext?.user).toBe(null);

        act(() => {
            userEvent.click(screen.getByTestId('login'), { button: 0 })
            MockAxios.mockResponse({ data: authRes })
        })

        await waitFor(() => screen.getByTestId('id'));

        expect(testContext?.user?.nickname).toBe(authRes.username);
        expect(testContext?.user?.nickname);
        localStorage.length
    })

    it('should login & logout', async () => {
        expect(testContext?.user).toBe(null);

        act(() => {
            userEvent.click(screen.getByTestId('login'), { button: 0 })
            MockAxios.mockResponse({ data: authRes })
        })

        await waitFor(() => screen.getByTestId('id'));

        expect(testContext?.user).not.toBe(null);
        expect(testContext?.user?.nickname).toBe(authRes.username);

        act(() => {
            userEvent.click(screen.getByTestId('logout'), { button: 0 });
        })

        expect(testContext?.user).toBe(null);
    })
})