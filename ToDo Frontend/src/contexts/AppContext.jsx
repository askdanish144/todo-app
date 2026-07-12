import { createContext, useState, useEffect } from "react";
import { checkAuth } from "../services/AuthServices";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

        checkAuth()
            .then((result) => {
                console.log("Result is: ", result);

                if (result.success) {
                    setIsLoggedIn(true);
                    setUser(result.user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }).catch((err) => {
                console.log("Error occured while authenticating user.", err);
            })

    }, []);

    return <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        {children}
    </AppContext.Provider>
}