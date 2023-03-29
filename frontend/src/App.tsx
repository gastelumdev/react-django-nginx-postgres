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

function App() {
    const [csrf, setCsrf] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                You are logged in!{" "}
                <div>
                    <button className="btn btn-danger" onClick={logout}>
                        Logout
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
