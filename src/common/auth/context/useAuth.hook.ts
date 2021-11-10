import { useContext } from "react";
import { AuthContext, AuthContextInterface } from "./AuthContext";

export const useAuth = (): AuthContextInterface =>
    useContext(AuthContext);