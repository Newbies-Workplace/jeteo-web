import axios, { AxiosInstance } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { authByProvidersToken, refreshToken as refreshApiToken } from "../../api/rest/auth/Auth";
import { AuthResponse } from "../../api/rest/auth/AuthResponse.interface";
import { createAxiosClient } from "./axiosService";
import { createApolloClient } from "./apolloService";
import Providers from "../../api/rest/auth/oauth/OAuthProvider.enum";
import { User } from "../../common/models/User";

export interface AuthContextInterface {
    auth(provider: string, code: string, state?: string): Promise<User>
    logout(): void
    user?: User
    refreshSession(): void
    axios: AxiosInstance
}

export const AuthContext = createContext<AuthContextInterface>({
    auth: async () => { throw new Error("AuthContext not initialized") },
    logout: () => { throw new Error("AuthContext not initialized") },
    refreshSession: () => { throw new Error("AuthContext not initialized") },
    axios: axios.create({baseURL: __RESTAPI_URI__})
});

export const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User|undefined>(undefined);

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
        localStorage.setItem("user_cache", JSON.stringify(authRes.user));

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

        setUser(() => undefined);
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
    }

    // get token at app start
    useEffect(() => {

        if (localStorage.getItem("refresh_token")) {
            refreshToken();

            try {
                const userCache = JSON.parse(localStorage.getItem("user_cache") || 'null') as User | null;
                if (userCache)
                    setUser(userCache);
            } catch(err) {
                console.log(err)
            }
        }

        localStorage.removeItem('user_cache');
        localStorage.removeItem('refresh_token');
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
