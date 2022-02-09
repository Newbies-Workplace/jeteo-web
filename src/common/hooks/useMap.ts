import { useState } from "react";

export const useMap = <K, T>() => {
    const [store, setStore] = useState<Map<K, T>>(new Map());

    return {
        get: (key: K) => store.get(key),
        has: (key: K) => store.has(key),
        set: (key: K, val: T) =>
            setStore( store => store.set(key, val)),
    }
}