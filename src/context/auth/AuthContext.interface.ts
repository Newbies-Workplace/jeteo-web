
export interface AuthContextInterface {
    isAuth: boolean,
    getUserData(): Promise<{ name: string }>,
    login(): Promise<boolean>,
    logout(): Promise<boolean>
}

export const DefaultAuthContext: AuthContextInterface = {
    isAuth: true,
    getUserData: async () => ({ name: 'test' }),
    login: async () => true,
    logout: async () => true,
}