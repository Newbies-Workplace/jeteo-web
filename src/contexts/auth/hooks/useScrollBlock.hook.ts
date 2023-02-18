import { useEffect } from 'react';

export const useScrollBlockHook = (): void => {
    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [])
}