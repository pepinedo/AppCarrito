import { createContext, useState, useEffect } from "react";

export const MainContext = createContext();

export const ContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
 
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    useEffect(() => {

      setIsLoading(false);
    }, [])
    

    return (
        <MainContext.Provider value={{
            isLoading,
            setIsLoading,
            user,
            token,
            login,
            logout
        }}>
            {!isLoading && children}
        </MainContext.Provider>
    )
}