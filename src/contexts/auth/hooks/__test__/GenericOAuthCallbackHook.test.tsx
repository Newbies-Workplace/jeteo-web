import React from "react";
import {render, waitFor} from "@testing-library/react";
import {AuthContextProvider} from "../../AuthContext";
import {OAuthStatus, useGenericOAuthCallback} from "../useGenericOAuthCallback.hook";
import OAuthProvider from "../../../../api/rest/auth/oauth/OAuthProvider.enum";
import {MemoryRouter} from "react-router-dom";
import {useAuth} from "../useAuth.hook";
import MockAxios from "jest-mock-axios";
import authRes from "../../../../__mocks__/responses/authResponse.json";
import {User} from "../../../../common/models/User";

describe("Auth context's useGenericOAuth hook", () => {
    let testError: string | null;
    let testStatus: OAuthStatus;
    let testUser: User | undefined;

    beforeEach(() => {
        testError = null;
        testStatus = OAuthStatus.pending;
        testUser = undefined;
    })

    function renderEnv(loc: string) {

        const Component = () => {
            const { user } = useAuth()
            const { error, status } = useGenericOAuthCallback(OAuthProvider.githubDev);

            testUser = user;
            testStatus = status;
            testError = error;

            return <>test</>
        }

        render(
            <MemoryRouter initialEntries={[loc]}>
                <AuthContextProvider>
                    <Component/>
                </AuthContextProvider>
            </MemoryRouter>
        )
    }

    it('should return "missing code" in error', () => {
        renderEnv('/?state=value');

        expect(testError).toBe('Code param is missing');
        expect(testStatus).toBe(OAuthStatus.error);
    })

    it('should return "missing state" in error', () => {
        renderEnv('/?code=value');

        expect(testError).toBe('State param is missing');
        expect(testStatus).toBe(OAuthStatus.error);
    })

    it("should return error param's value in error", () => {
        renderEnv('/?error=some+error+message');

        expect(testError).toBe('some error message');
        expect(testStatus).toBe(OAuthStatus.error);
    })


    it('should return success', async () => {
        renderEnv('/?code=123&state=123')
        MockAxios.mockResponse({ data: authRes })

        await waitFor(() => expect(testUser).toBeDefined());

        expect(testStatus).toBe(OAuthStatus.success);
        expect(testError).toBeNull();
    })
})