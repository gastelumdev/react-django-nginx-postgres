// import { state } from "../../app/store";
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAccessToken, selectCSRF } from "./authSlice";
import { RootState } from "../../app/store";




// export const getSession = () => {
//     return axios.get("http://127.0.0.1:8000/api/session/", {withCredentials: true});
// }

// export const getCSRF = () => {
//     return axios.get("http://127.0.0.1:8000/api/csrf/", { withCredentials: true });
// }

interface Login {
    csrf: string;
    username: string;
    password: string;
}

interface User {
    // csrf: string;
    username: string;
    email: string;
    password: string;
}

interface Signin {
    username: string;
    password: string;
}

// export const login = ({csrf, username, password}: Login) => {
//     return axios.post("http://127.0.0.1:8000/api/login/", 
//     {
//         withCredentials: true,
//         username: username, 
//         password: password
//     },
//     {
//         headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": csrf
//         }
//     })
// }

// export const logout = () => {
//     return axios.get("http://127.0.0.1:8000/api/logout", {withCredentials: true});
// }

// export const register = ({csrf, username, email, password}: User) => {
//     return axios.post("http://127.0.0.1:8000/api/register/", 
//     {
//         withCredentials: true, 
//         username: username, 
//         email: email, 
//         password: password
//     },{
//         headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": csrf
//         }
//     })
// }

export const signin = ({username, password}: Signin) => {
    return axios.post(process.env.HOST + "/auth/jwt/create/", {username, password}, {headers: {"Content-Type": "application/json"}});
}

export const register = ({username, email, password}: User) => {
    return axios.post(process.env.HOST + "/auth/users/", {username, email, password}, {headers: {"Content-Type": "application/json"} });
}

export const getUser = (token: string) => {
    return axios.get(process.env.HOST + "/auth/users/me/",  {headers: {"Authorization": "JWT " + getToken()}});
}

export const getSession = () => {
    return axios.post(process.env.HOST + "/auth/jwt/verify/", {token: getToken()}, {headers: {"Content-Type": "application/json"} });
}

export const refreshToken = () => {
    return axios.post(process.env.HOST + "/auth/jwt/verify/", {token: getRefreshToken()}, {headers: {"Content-Type": "application/json"} })
}

const getToken = () => {
    return localStorage.getItem('token')
}

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}