import { useEffect } from 'react';
export const useScrollBlock = () => {
    useEffect(()=> {
        document.body.style.overflow = "hidden"
        return ()=> {
            document.body.style.overflow = "auto"
        }
    },[])
}