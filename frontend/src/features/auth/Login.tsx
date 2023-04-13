import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    getSessionAsync,
    loginAsync,
    selectCSRF,
    selectSession,
    setCSRFAsync,
} from "./authSlice";

export function Login() {
    const isAuthenticated = useAppSelector(selectSession);
    const csrf = useAppSelector(selectCSRF);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        dispatch(loginAsync({ csrf, username, password }));
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <p className="lead">
                                    Sign in to your account to continue
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="text-center">
                                            {/* <img
                                                src="img/avatars/avatar.jpg"
                                                alt="Charles Hall"
                                                className="img-fluid rounded-circle"
                                                width={132}
                                                height={132}
                                            /> */}
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Username
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    name="username"
                                                    placeholder="Enter your username"
                                                    value={username}
                                                    onChange={handleUsername}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={handlePassword}
                                                />
                                                <small>
                                                    <a href="index.html">
                                                        Forgot password?
                                                    </a>
                                                </small>
                                            </div>

                                            <div className="text-center mt-3">
                                                {/* <a
                                                    href="index.html"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Sign in
                                                </a> */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        // <div>
        //     {isAuthenticated && <Navigate to="/" replace />}
        //     {/* <button onClick={() => dispatch(loginAsync(csrf))}>Login</button> */}
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" value={username} onChange={handleUsername} />
        //         <input
        //             type="password"
        //             value={password}
        //             onChange={handlePassword}
        //         />
        //         <input type="submit" value="Login" />
        //     </form>
        // </div>
    );
}
