import axios from "axios"
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCSRF } from "./authSlice";



export const getSession = () => {
    return axios.get("/api/session/", {withCredentials: true});
}

export const getCSRF = () => {
    return axios.get("/api/csrf/", { withCredentials: true });
}

interface Login {
    csrf: string;
    username: string;
    password: string;
}

interface User {
    csrf: string;
    username: string;
    email: string;
    password: string;
}

export const login = ({csrf, username, password}: Login) => {
    return axios.post("/api/login/", 
    {
        withCredentials: true,
        username: username, 
        password: password
    },
    {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf
        }
    })
}

export const logout = () => {
    return axios.get("/api/logout", {withCredentials: true});
}

export const register = ({csrf, username, email, password}: User) => {
    return axios.post("/api/register/", 
    {
        withCredentials: true, 
        username: username, 
        email: email, 
        password: password
    },{
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf
        }
    })
}