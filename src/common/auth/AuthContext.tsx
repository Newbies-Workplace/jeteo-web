import { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import React, {createContext, useEffect, useState} from "react";
import Providers from "../models/ProvidersList";
import { User } from "../models/User";
import { AuthResponse } from "./service/authResponse.interface";
import { authByProvidersToken, refreshToken as refreshApiToken } from "./service/Auth";
import { JwtData } from "./service/jwtData.interface";
import { createAxiosClient } from "./axiosService";
import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {createApolloClient} from "./apolloService";


export interface AuthContextInterface {
    auth(provider: string, code: string, state?: string): Promise<User>;
    logout(): void;

    user: User | null; // undefined == not authorized

    axios?: AxiosInstance;
}
const defaultAuthContext: AuthContextInterface = {
    auth: async () => { throw new Error("Context not initialized") },
    logout: () => { throw new Error("Context not initialized") },
    user: null,
}

export const AuthContext = createContext<AuthContextInterface>(defaultAuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
    //todo(DiD3n): move to separate (axios) context
    const [axiosClient, setAxiosClient] = useState<AxiosInstance>(() => createAxiosClient());
    //todo(DiD3n): move to separate (apollo) context
    const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>(() => createApolloClient());

    const [user, setUser] = useState<User | null>(null);

    /**
     * Update axios authorization header, decode user, save refresh_token
     * @param authRes auth request's response
     */
    const handleAuth = (authRes: AuthResponse): User => {
        axiosClient.defaults.headers.common["Authorization"] = authRes.accessToken;
        setApolloClient(() => createApolloClient({
            cache: new InMemoryCache(),
            headers: {
                ["Authorization"]: authRes.accessToken,
                ["Access-Control-Allow-Origin"]: 'true',
            },
            z
        }))

        localStorage.setItem("refresh_token", authRes.refreshToken);

        const decodedToken: JwtData = jwtDecode(authRes.accessToken);

        //todo(DiD3n): convince 'backend guy' to include user in response
        const user = {
            id: decodedToken.id,
            nickname: authRes.username,
            tags: ["dev", "***** ***", "i use arch btw"]
        };

        setUser(() => user);
        return user;
    }

    // setup interceptor for 401
    useEffect(() => {
        const _axiosInstance = axiosClient; // React 17.0.0 C:

        const interceptorId = _axiosInstance.interceptors.response.use(response => response, async (error) => {
            const code = error.response ? error.response.status : null;
            const refresh_token = localStorage.getItem("refresh_token");

            if (code != 401 || !refresh_token)
                return Promise.reject(error);

            // clear to prevent endless loop 
            // next line will override refresh_token anyway
            localStorage.removeItem("refresh_token");
            const authRes = await refreshApiToken(axiosClient, refresh_token)

            handleAuth(authRes);
        })

        return () => {
            // now sure if gc will handle this 'in time'
            _axiosInstance.interceptors.response.eject(interceptorId);
        }
    }, [axiosClient]);

    // get token at app start
    useEffect(() => {
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

    }, [])

    const auth = async (provider: Providers, code: string, state?: string): Promise<User> => {
        const authRes = await authByProvidersToken(axiosClient, provider, code, state);

        if (!authRes)
            throw new Error("Auth failed!");

        return handleAuth(authRes);
    }

    const logout = () => {
        setAxiosClient(() => createAxiosClient());
        setUser(() => null);
        localStorage.setItem("refresh_token", "");
    }

    return (
        <ApolloProvider client={apolloClient}>
            <AuthContext.Provider
                value={{
                    auth,
                    logout,
                    user,
                    axios: axiosClient
                }}>
                {children}
            </AuthContext.Provider>
        </ApolloProvider>
    )
};
