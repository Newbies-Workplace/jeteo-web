import React, {useEffect} from "react";
import MockAxios from "jest-mock-axios";
import { render, act } from "@testing-library/react";

import authRes from '../../../__mocks__/responses/authResponse.json';
import failedAuthRes from '../../../__mocks__/responses/failedAuthResponse.json';

import {AuthContextProvider} from "../AuthContext";
import {useAuth} from "../hooks/useAuth.hook";
import {User} from "../../../common/models/User";

describe("Authorization Context's Session restore", () => {

    let testUser: User|undefined;

    const TestComponent: React.FC = () => {
        const { user } = useAuth();

        useEffect(() => {
            testUser = user;
        }, [user?.id])

        return <div/>
    }

    beforeEach(() => {
        testUser = undefined;
        localStorage.clear();
    });

    describe('when localStorage is empty', () => {

        beforeEach(() => {
            render(
                <TestComponent/>,
                {wrapper: AuthContextProvider}
            );
        })

        it('should do nothing', () => {
            expect(testUser).toBeUndefined();
        });
    });

    describe("when localStorage's refreshToken is set", () => {

        describe('when token is valid', () => {

            beforeEach(() => {
                localStorage.setItem('refresh_token', 'token')

                render(
                    <TestComponent/>,
                    {wrapper: AuthContextProvider}
                );
                act(() => MockAxios.mockResponse(authRes))
            })

            it('should auth', () => {
                expect(testUser).toBeDefined();
            });

            it('should set new refreshToken', () => {
                expect(localStorage.getItem('refresh_token')).toBe(authRes.data.refreshToken);
            });
        });

        describe('when token is invalid', () => {

            beforeEach(() => {
                localStorage.setItem('refresh_token', 'invalid-token');

                render(
                    <TestComponent/>,
                    {wrapper: AuthContextProvider}
                );
                act(() => MockAxios.mockResponse(failedAuthRes))
            })

            it('should fail auth', () => {
                expect(testUser).toBeUndefined();
            });

            it('should remove token from localStorage', () => {
                expect(localStorage.getItem('refresh_token')).toBeNull();
            });
        });
    });
});