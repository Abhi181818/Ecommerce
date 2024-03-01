import { set } from "mongoose";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "" });
    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parsedData = JSON.parse(data)
            setAuth({user:parsedData.user,token:parsedData.token})
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthProvider, useAuth }