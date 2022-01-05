import { AxiosInstance } from "axios";
import { createContext } from "react";
import { User } from "../../models/User";

export interface AuthContextInterface {
    auth(provider: string, code: string): Promise<User>;
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
