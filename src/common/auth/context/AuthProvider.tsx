import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Providers from "../../models/ProvidersList";
import { User } from "../../models/User";
import { AuthResponse } from "../service/authResponse.interface";
import { authByGithub } from "../service/callback";
import { JwtData } from "../service/jwtData.interface";
import { AuthContext } from "./AuthContext";

// wanna change api's ip? >> go to webpack.dev.js <<
const API_URL = 'http://127.0.0.1:8080';

export const AuthContextProvider: React.FC = ({ children }) => {
    const [axiosInstance, setAxiosInstance] = useState<AxiosInstance>(() => axios.create({ baseURL: process.env.BACKEND_API }));

    const [user, setUser] = useState<User | null>(null);

    /**
     * Update axios authorization header, decode user, save refresh_token
     * @param authRes auth request's response
     */
    const handleAuth = (authRes: AuthResponse): User => {
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

    useEffect(() => {
        const _axiosInstance = axiosInstance; // React 17.0.0 C:

        const interceptorId = _axiosInstance.interceptors.response.use(response => response, async (error) => {
            const code = error.response ? error.response.status : null;

            if (code != 401)
                return Promise.reject(error);


        })

        return () => {
            // now sure if gc will handle this 'in time'
            _axiosInstance.interceptors.response.eject(interceptorId);
        }
    }, [axiosInstance]);

    const auth = async (provider: Providers, code: string): Promise<User> => {
        const authRes = await authByGithub(axiosInstance, code, provider);

        if (!authRes)
            throw new Error("Auth failed!");


        return handleAuth(authRes);
    }

    const logout = () => {
        setAxiosInstance(() => axios.create())
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                logout,
                user,
                axios
            }}>
            {children}
        </AuthContext.Provider>
    )
};
