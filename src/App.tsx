import { FC } from "react";

import { AuthContextProvider } from "./common/auth/AuthContext";

import Router from "./Router";

export const App: FC = function() {
    return (
        <AuthContextProvider>
            <Router />
        </AuthContextProvider>
    );
};

export default App;