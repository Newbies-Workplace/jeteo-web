
export interface AuthContextInterface {
    isAuth: boolean,
    getUserData(): Promise<any>,
    login(): Promise<boolean>,
    logout(): Promise<boolean>
}

export const DefaultAuthContext: AuthContextInterface = {
    isAuth: true,
    getUserData: async () => { },
    login: async () => true,
    logout: async () => true,
}