import React from "react";
import { render as renderReact, waitFor, screen, act } from "@testing-library/react";

import { AuthContextProvider, AuthContextInterface } from '../AuthContext';
import { useAuth } from "../hooks/useAuth.hook";
import MockAxios from "jest-mock-axios";

import authRes from '../../../__mocks__/responses/authResponse.json';
import userEvent from "@testing-library/user-event";

describe('Authorization Context', () => {

    let testContext: AuthContextInterface | null = null;


    afterEach(() => {
        testContext = null;
    })

    beforeEach(() => {
        localStorage.clear();

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
        expect(testContext?.user).toBe(undefined);

        act(() => {
            userEvent.click(screen.getByTestId('login'), { button: 0 })
            MockAxios.mockResponse(authRes)
        })

        await waitFor(() => screen.getByTestId('id'));

        expect(testContext?.user?.nickname).toBe(authRes.data.username);
        expect(testContext?.user?.nickname);
    })

    it('should login & logout', async () => {
        expect(testContext?.user).toBe(undefined);

        act(() => {
            userEvent.click(screen.getByTestId('login'), { button: 0 })
            MockAxios.mockResponse(authRes)
        })

        await waitFor(() => screen.getByTestId('id'));

        expect(testContext?.user).toBeDefined();
        expect(testContext?.user?.nickname).toBe(authRes.data.username);

        act(() => {
            userEvent.click(screen.getByTestId('logout'), { button: 0 });
        })

        expect(testContext?.user).toBe(undefined);
    })
})