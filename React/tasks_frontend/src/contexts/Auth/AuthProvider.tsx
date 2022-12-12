import axios from "axios";
import { useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const api = useApi();


    // Validacao do token salvo no navegador do usuario nao esta sendo validada com o a requisicao falsa (problema)

    // useEffect(() => {
    //     const validateToken = async () => {
    //         const storageData = localStorage.getItem('authToken');
    //         if(storageData) {
    //             const data = await api.validateToken(storageData);
    //             // @ts-ignore
    //             if(data.user) {
    //                 // @ts-ignore
    //                 setUser(data.user)
    //             }
    //         }
    //     }
    //     validateToken();
    // }, [api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true
        }
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
        setToken('');
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}