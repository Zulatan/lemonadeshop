import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // Define state variable 'value' and its setter 'setValue' using useState hook
    const [value, setValue] = useState<T>(() => {
        // Function to retrieve value from localStorage using the provided key
        const jsonValue = localStorage.getItem(key)
        // If a value exists in localStorage, parse and return it
        if (jsonValue != null) return JSON.parse(jsonValue)
        
        // If no value exists in localStorage, initialize with the provided initialValue
        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    // useEffect hook to update localStorage whenever 'value' changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    // Return 'value' and 'setValue' as an array
    return [value, setValue] as [typeof value, typeof setValue]
}
