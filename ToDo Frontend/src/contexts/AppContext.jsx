import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const helloFunc = () => {
        console.log("Hello World From Context!");
    }

    return <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        {children}
    </AppContext.Provider>
}