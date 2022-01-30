import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import React, {createContext, useEffect, useState} from "react";
import Providers from "../models/ProvidersList";
import { User } from "../models/User";
import { AuthResponse } from "./service/authResponse.interface";
import { authByProvidersToken, refreshToken as refreshApiToken } from "./service/Auth";
import { JwtData } from "./service/jwtData.interface";


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


const AXIOS_CONFIG = {
    baseURL: process.env.API_URL
}

export const AuthContextProvider: React.FC = ({ children }) => {
    const [axiosInstance, setAxiosInstance] = useState<AxiosInstance>(() => axios.create(AXIOS_CONFIG));

    const [user, setUser] = useState<User | null>(null);

    /**
     * Update axios authorization header, decode user, save refresh_token
     * @param authRes auth request's response
     */
    const handleAuth = (authRes: AuthResponse): User => {
        axiosInstance.defaults.headers.common["Authorization"] = authRes.accessToken;

        localStorage.setItem("refresh_token", authRes.accessToken);

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
        const _axiosInstance = axiosInstance; // React 17.0.0 C:

        const interceptorId = _axiosInstance.interceptors.response.use(response => response, async (error) => {
            const code = error.response ? error.response.status : null;
            const refresh_token = localStorage.getItem("refresh_token");

            if (code != 401 || !refresh_token)
                return Promise.reject(error);

            // clear to prevent endless loop 
            // next line will override refresh_token anyway
            localStorage.removeItem("refresh_token");
            const authRes = await refreshApiToken(axiosInstance, refresh_token)

            handleAuth(authRes);
        })

        return () => {
            // now sure if gc will handle this 'in time'
            _axiosInstance.interceptors.response.eject(interceptorId);
        }
    }, [axiosInstance]);

    // get token at app start
    useEffect(() => {
        const refresh_token = localStorage.getItem("refresh_token");


        if (refresh_token && refresh_token != "undefined")
            refreshApiToken(axiosInstance, refresh_token)
                .then(handleAuth)
                .catch((err) => {
                    console.error(err)
                    localStorage.removeItem("refresh_token");
                })
        else
            localStorage.removeItem("refresh_token");

    }, [])

    const auth = async (provider: Providers, code: string, state?: string): Promise<User> => {
        const authRes = await authByProvidersToken(axiosInstance, provider, code, state);

        if (!authRes)
            throw new Error("Auth failed!");

        return handleAuth(authRes);
    }

    const logout = () => {
        setAxiosInstance(() => axios.create(AXIOS_CONFIG));
        setUser(() => null);
        localStorage.setItem("refresh_token", "");
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                logout,
                user,
                axios: axiosInstance
            }}>
            {children}
        </AuthContext.Provider>
    )
};
