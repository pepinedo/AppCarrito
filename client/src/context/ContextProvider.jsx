import { createContext, useState, useEffect } from "react";

export const MainContext = createContext();

export const ContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const fetchUser = async () => {
        setIsLoading(true);
        // setUser({
        //     Id: 1,
        //     username: "pedro",
        // })
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <MainContext.Provider value={{
            user
        }}>
            {!isLoading && children}
        </MainContext.Provider>
    )
}