import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Providers from "../../models/ProvidersList";
import { User } from "../../models/User";
import { AuthResponse } from "../service/authResponse.interface";
import { authByProvidersToken, refreshToken as refreshApiToken } from "../service/Auth";
import { JwtData } from "../service/jwtData.interface";
import { AuthContext } from "./AuthContext";

// wanna change api's ip? >> go to webpack.dev.js <<
const API_URL = 'http://127.0.0.1:8080';

const AXIOS_CONFIG = {
    baseURL: API_URL
}

export const AuthContextProvider: React.FC = ({ children }) => {
    const [axiosInstance, setAxiosInstance] = useState<AxiosInstance>(() => axios.create(AXIOS_CONFIG));

    const [user, setUser] = useState<User | null>(null);

    /**
     * Update axios authorization header, decode user, save refresh_token
     * @param authRes auth request's response
     */
    const handleAuth = (authRes: AuthResponse): User => {
        console.log(authRes);

        axiosInstance.defaults.headers.common["Authorization"] = authRes.access_token;

        localStorage.setItem("refresh_token", authRes.refresh_token);

        const decodedToken: JwtData = jwtDecode(authRes.access_token);

        //todo(DiD3n): convince 'backend guy' to include user in response
        const user = {
            createAt: 0,
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
            localStorage.setItem("refresh_token", "");
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

        if (refresh_token)
            refreshApiToken(axiosInstance, refresh_token)
                .then(handleAuth)
    }, [])

    const auth = async (provider: Providers, code: string): Promise<User> => {
        const authRes = await authByProvidersToken(axiosInstance, code, provider);

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
