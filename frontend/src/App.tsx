import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Counter } from "./features/counter/Counter";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { Login } from "./features/auth/Login";

import {
    getSessionAsync,
    loginAsync,
    logoutAsync,
    selectCSRF,
    selectSession,
    setCSRFAsync,
} from "./features/auth/authSlice";

interface Auth {
    username: string;
    password: string;
}

interface Response {
    status: number;
    statusText: string;
}

interface User {
    username: string;
}

function App() {
    // const [csrf, setCsrf] = useState("");
    // const [error, setError] = useState("");
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [user, setUser] = useState<User>({ username: "" });

    const isAuthenticated = useAppSelector(selectSession);
    const dispatch = useAppDispatch();

    const csrf = useAppSelector(selectCSRF);

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(setCSRFAsync());
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(getSessionAsync());
    }, []);

    // const login = () => {
    //     axios
    //         .post<Auth>(
    //             "/api/login/",
    //             {
    //                 withCredentials: true,
    //                 username: "superuser",
    //                 password: "Coll@b#2023",
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "X-CSRFToken": csrf,
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             console.log(res.data);
    //             return res;
    //         })
    //         .then((res) => isResponseOk(res))
    //         .then((data) => {
    //             console.log(data);
    //             setIsAuthenticated(true);
    //             whoami();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setError("Wrong username or password.");
    //         });
    // };

    // const logout = () => {
    //     axios
    //         .get("/api/logout/", { withCredentials: true })
    //         .then((res) => {
    //             setIsAuthenticated(false);
    //             getCSRF();
    //         })
    //         .catch((err) => console.log(err));
    // };

    // const getSession = () => {
    //     axios
    //         .get("/api/session/", { withCredentials: true })
    //         .then((res) => {
    //             console.log(res.data);
    //             if (res.data.isAuthenticated) {
    //                 setIsAuthenticated(true);
    //             } else {
    //                 setIsAuthenticated(false);
    //                 getCSRF();
    //             }
    //         })
    //         .catch((err) => console.log(error));
    // };

    // const getCSRF = () => {
    //     axios
    //         .get("/api/csrf/", { withCredentials: true })
    //         .then((res) => {
    //             console.log(res.headers["x-csrftoken"]);
    //             setCsrf(res.headers["x-csrftoken"]);
    //         })
    //         .catch((err) => console.log(err));
    // };

    // const whoami = () => {
    //     axios
    //         .get("/api/whoami", { withCredentials: true })
    //         .then((res) => setUser({ username: res.data.username }))
    //         .catch((err) => console.log(err));
    // };

    // const isResponseOk = (response: Response) => {
    //     if (response.status >= 200 && response.status <= 299) {
    //         return response;
    //     } else {
    //         throw Error(response.statusText);
    //     }
    // };

    // COUNTER **************************************************
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <Counter />
            </header>
            <button onClick={() => dispatch(loginAsync(csrf))}>Login</button>
            <button onClick={() => dispatch(logoutAsync())}>Logout</button>
            {isAuthenticated ? <p>We're Good</p> : <p>We're not good</p>}
        </div>
    );
    // COUNTER END **********************************************

    // if (isAuthenticated) {
    //     return (
    //         <div>
    //             Welcome {user.username}.You are logged in!{" "}
    //             <div>
    //                 <button className="btn btn-danger" onClick={logout}>
    //                     Logout
    //                 </button>
    //                 <button className="btn btn-danger" onClick={whoami}>
    //                     Who Am I
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    // return (
    //     <div>
    //         You are logged out!
    //         <div>
    //             <button className="btn btn-danger" onClick={login}>
    //                 Login
    //             </button>
    //         </div>
    //     </div>
    // );
}

export default App;
