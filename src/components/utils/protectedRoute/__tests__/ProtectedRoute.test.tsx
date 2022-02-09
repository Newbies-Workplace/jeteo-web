import React from "react";
import { Location } from 'history'
import { Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom"
import userEvent from '@testing-library/user-event'
import MockAxios from "jest-mock-axios";
import { render as renderReact, screen, waitFor, act } from "@testing-library/react";
import { AuthContextProvider } from "../../../../common/auth/AuthContext"
import { ProtectedRoute } from "../ProtectedRoute";
import { useAuth } from "../../../../common/auth/useAuth.hook";

import authRes from './authResponse.json';

describe('<ProtectedRoute />', () => {

    let testLocation: Location | null;

    afterEach(() => {
        testLocation = null;
    });

    beforeEach(() => {
        const LoginButton: React.FC = () => {
            const { auth, user } = useAuth();

            const handleClick = async () => {
                auth("fake", "2137*****420***69");
                MockAxios.mockResponse({ data: authRes })
            };

            return (
                <>
                    {user?.nickname ? <span data-testid="authorized">authorized</span> : null}

                    <button
                        data-testid="login-button"
                        onClick={handleClick}>
                        login-button
                    </button>
                </>
            );
        };

        renderReact(
            <MemoryRouter initialEntries={["/secret"]}>
                <LoginButton />
                <Switch>
                    <ProtectedRoute
                        path="/secret"
                        render={({ location }) => {
                            testLocation = location;
                            return (
                                <span data-testid="secret">
                                    SecretSubPage
                                </span>
                            );
                        }}
                        fallback={<Redirect to="/not-secret" />}
                    />
                    <Route
                        path="/not-secret"
                        render={({ location }) => {
                            testLocation = location;
                            return (
                                <span data-testid="not-secret">
                                    <Link
                                        data-testid="secret-link"
                                        to="/secret">
                                        secret-link
                                    </Link>
                                    Nothing special
                                </span>
                            );
                        }}
                    />
                </Switch>
            </MemoryRouter >, { wrapper: AuthContextProvider }
        );
    });


    it('should hide content', () => {
        act(() => {
            userEvent.click(screen.getByTestId('secret-link'), { button: 0 })
        })

        expect(screen.findByText("NothingHere")).toBeDefined();
        expect(testLocation?.pathname).toBe("/not-secret");
    });

    it('should show content', async () => {

        expect(testLocation?.pathname).toBe("/not-secret");

        act(() => {
            screen.getByTestId('login-button').click();
        })

        // wait for context
        await waitFor(() =>
            expect(screen.getByTestId('authorized')).toBeInTheDocument()
        );

        act(() => {
            userEvent.click(screen.getByTestId('secret-link'), { button: 0 })
        })

        expect(testLocation?.pathname).toBe("/secret");
        expect(screen.getByTestId("secret")).toBeInTheDocument();
    });
});