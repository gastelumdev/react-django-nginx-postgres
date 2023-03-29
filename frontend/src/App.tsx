import axios from "axios";
import { useEffect, useState } from "react";

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
    const [csrf, setCsrf] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>({ username: "" });

    useEffect(() => {
        getSession();
    }, [isAuthenticated]);

    const login = () => {
        axios
            .post<Auth>(
                "/api/login/",
                {
                    withCredentials: true,
                    username: "superuser",
                    password: "Coll@b#2023",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrf,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                return res;
            })
            .then((res) => isResponseOk(res))
            .then((data) => {
                console.log(data);
                setIsAuthenticated(true);
                whoami();
            })
            .catch((err) => {
                console.log(err);
                setError("Wrong username or password.");
            });
    };

    const logout = () => {
        axios
            .get("/api/logout/", { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(false);
                getCSRF();
            })
            .catch((err) => console.log(err));
    };

    const getSession = () => {
        axios
            .get("/api/session/", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    getCSRF();
                }
            })
            .catch((err) => console.log(error));
    };

    const getCSRF = () => {
        axios
            .get("/api/csrf/", { withCredentials: true })
            .then((res) => {
                console.log(res.headers["x-csrftoken"]);
                setCsrf(res.headers["x-csrftoken"]);
            })
            .catch((err) => console.log(err));
    };

    const whoami = () => {
        axios
            .get("/api/whoami", { withCredentials: true })
            .then((res) => setUser({ username: res.data.username }))
            .catch((err) => console.log(err));
    };

    const isResponseOk = (response: Response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            throw Error(response.statusText);
        }
    };

    if (isAuthenticated) {
        return (
            <div>
                Welcome {user.username}.You are logged in!{" "}
                <div>
                    <button className="btn btn-danger" onClick={logout}>
                        Logout
                    </button>
                    <button className="btn btn-danger" onClick={whoami}>
                        Who Am I
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            You are logged out!
            <div>
                <button className="btn btn-danger" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default App;
