import axios from "axios"
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCSRF } from "./authSlice";



export const getSession = () => {
    return axios.get("/api/session/", {withCredentials: true});
}

export const getCSRF = () => {
    return axios.get("/api/csrf/", { withCredentials: true });
}



export const login = (csrf: string) => {
    return axios.post("/api/login/", 
    {
        withCredentials: true, 
        username: "omargastelum", 
        password: "gastelumdev12345"
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