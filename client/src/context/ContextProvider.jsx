import { createContext, useState } from "react";

export const MainContext = createContext();

export const ContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
 
    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <MainContext.Provider value={{
            isLoading,
            user,
            login,
            logout
        }}>
            {!isLoading && children}
        </MainContext.Provider>
    )
}