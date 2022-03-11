import React from "react";
import { Link, MemoryRouter, Navigate, Route, Routes } from "react-router-dom"
import userEvent from '@testing-library/user-event'
import MockAxios from "jest-mock-axios";
import { render as renderReact, screen, waitFor, act } from "@testing-library/react";

import { AuthContextProvider } from "../../../../common/auth/AuthContext"
import { RequireAuth } from "../RequireAuth";
import { useAuth } from "../../../../common/auth/useAuth.hook";

import authRes from './authResponse.json';

describe('<ProtectedRoute />', () => {
    const SecretPage = () => (
        <span data-testid="secret">
                Secret
            </span>
    );

    const HomePage = () => (
        <span data-testid="home">
                Home
            </span>
    );

    const AuthInfo = () => {
        const { user } = useAuth();
        return user
            ? <span data-testid="authorized">authorized</span>
            : <span data-testid="unauthorized">unauthorized</span>
    };


    const LoginButton = () => {
        const { auth } = useAuth();

        return (
            <button
                data-testid="login-button"
                onClick={() => {
                    auth("fake", "2137*****420***69");
                    MockAxios.mockResponse({ data: authRes })
                }}>
                login-button
            </button>
        );
    };


    it('should hide content', () => {
        act(() => {
            renderReact(
                <MemoryRouter initialEntries={["/secret"]}>
                    <Link data-testid="home-link" to="/home">home-link</Link>
                    <Link data-testid="secret-link" to="/secret">secret-link</Link>
                    <AuthInfo/>
                    <Routes>
                        <Route
                            path="/secret"
                            element={
                                <RequireAuth
                                    fallback={<Navigate to="/home" />}>
                                    <SecretPage/>
                                </RequireAuth>
                            }/>

                        <Route
                            path="/home"
                            element={<HomePage/>}/>
                    </Routes>
                </MemoryRouter>, { wrapper: AuthContextProvider }
            );
        })
        expect(screen.getByTestId("home")).toBeInTheDocument();
        expect(screen.getByTestId("unauthorized")).toBeInTheDocument();

        act(() => {
            userEvent.click(screen.getByTestId('secret-link'), { button: 0 })
        })

        expect(screen.getByTestId("home")).toBeInTheDocument();
        expect(screen.getByTestId("unauthorized")).toBeInTheDocument();
    });

    it('should show content', async () => {
        act(() => {
            renderReact(
                <MemoryRouter initialEntries={["/secret"]}>
                    <Link data-testid="home-link" to="/home">home-link</Link>
                    <Link data-testid="secret-link" to="/secret">secret-link</Link>
                    <AuthInfo/>
                    <LoginButton/>
                    <Routes>
                        <Route
                            path="/secret"
                            element={
                                <RequireAuth
                                    fallback={<Navigate to="/home" />}>
                                    <SecretPage/>
                                </RequireAuth>
                            }/>

                        <Route
                            path="/home"
                            element={<HomePage/>}/>
                    </Routes>
                </MemoryRouter>, { wrapper: AuthContextProvider }
            );
        })
        expect(screen.getByTestId("home")).toBeInTheDocument();
        expect(screen.getByTestId("unauthorized")).toBeInTheDocument();

        act(() => {
            screen.getByTestId('login-button').click();
        })

        await waitFor(() => {
            expect(screen.getByTestId('authorized')).toBeInTheDocument();
        });

        act(() => {
            userEvent.click(screen.getByTestId('secret-link'), { button: 0 })
        })

        expect(screen.getByTestId("secret")).toBeInTheDocument();
    });
});