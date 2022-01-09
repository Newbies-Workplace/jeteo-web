import { FC } from "react";

import { AuthContextProvider } from "./common/auth/context/AuthProvider";

import Router from "./Router";

export const App: FC = function() {
    return (
        <AuthContextProvider>
            <Router />
        </AuthContextProvider>
    );
};

export default App;