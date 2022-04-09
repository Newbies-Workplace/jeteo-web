import axios, { AxiosInstance } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { authByProvidersToken, refreshToken as refreshApiToken } from "../../api/rest/auth/Auth";
import { AuthResponse } from "../../api/rest/auth/AuthResponse.interface";
import { createAxiosClient } from "./axiosService";
import { createApolloClient } from "./apolloService";
import Providers from "../../common/models/ProvidersList";
import { User } from "../../common/models/User";

export interface AuthContextInterface {
    auth(provider: string, code: string, state?: string): Promise<User>;
    logout(): void;
    user: User | null; // undefined == not authorized
    refreshSession(): void;
    axios: AxiosInstance,
}

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    auth: async () => { throw new Error("AuthContext not initialized") },
    logout: () => { throw new Error("AuthContext not initialized") },
    refreshSession: () => { throw new Error("AuthContext not initialized") },
    axios: axios.create({baseURL: __RESTAPI_URI__})
});

export const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const [axiosClient, setAxiosClient] = useState<AxiosInstance>(() => createAxiosClient());
    const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>(() => createApolloClient());


    /**
     * Update rest authorization header, decode user, save refresh_token
     * @param authRes auth request's response
     */
    const handleAuth = (authRes: AuthResponse): User => {
        axiosClient.defaults.withCredentials = true;
        axiosClient.defaults.headers.common["Authorization"] = "Bearer " + authRes.accessToken;

        //todo: modify existing instance
        setApolloClient(() => createApolloClient({
            headers: {
                ["Authorization"]: "Bearer " + authRes.accessToken,
            }
        }));

        localStorage.setItem("refresh_token", authRes.refreshToken);

        const userModel = User.fromResponse(authRes.user)

        setUser(() => userModel);
        return userModel;
    }

    const auth = async (provider: Providers, code: string, state?: string): Promise<User> => {
        const authRes = await authByProvidersToken(axiosClient, provider, code, state);

        if (!authRes)
            throw new Error("Auth failed!");

        return handleAuth(authRes);
    }

    const logout = () => {
        setApolloClient(() => createApolloClient());
        setAxiosClient(() => createAxiosClient());

        setUser(() => null);
        localStorage.setItem("refresh_token", "");
    }

    const refreshToken = () => {
        const refresh_token = localStorage.getItem("refresh_token");

        if (refresh_token && refresh_token != "undefined")
            refreshApiToken(axiosClient, refresh_token)
                .then(handleAuth)
                .catch((err) => {
                    console.error(err)
                    localStorage.removeItem("refresh_token");
                })
        else
            localStorage.removeItem("refresh_token");
    }

    // get token at app start
    useEffect(() => {
        refreshToken();
    }, []);



    return (
        <ApolloProvider client={apolloClient}>
            <AuthContext.Provider
                value={{
                    auth,
                    logout,
                    user,
                    refreshSession: refreshToken,
                    axios: axiosClient
                }}>
                {children}
            </AuthContext.Provider>
        </ApolloProvider>
    )
};
