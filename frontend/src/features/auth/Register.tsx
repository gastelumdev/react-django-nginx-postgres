import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    // loginAsync,
    // logoutAsync,
    registerAsync,
    selectCSRF,
    selectSession,
    selectStatus,
} from "./authSlice";

const Register = () => {
    const isAuthenticated = useAppSelector(selectSession);
    const csrf = useAppSelector(selectCSRF);
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    if (status === "loading") {
        console.log("Spinning!");
        return null;
    }

    const handleUsername = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setUsername(event.target.value);
    };

    const handleEmail = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        dispatch(registerAsync({ csrf, username, email, password }));
    };

    return isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <h1 className="h2">Get started</h1>
                                <p className="lead">
                                    Start creating the best possible user
                                    experience for you customers.
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Userame
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    name="username"
                                                    placeholder="Enter your name"
                                                    value={username}
                                                    onChange={handleUsername}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={handleEmail}
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
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={handlePassword}
                                                />
                                            </div>
                                            <div className="text-center mt-3">
                                                {/* <a
                                                    href="index.html"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Sign up
                                                </a> */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Sign up
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
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" value={username} onChange={handleUsername} />
        //         <input type="email" value={email} onChange={handleEmail} />
        //         <input
        //             type="password"
        //             value={password}
        //             onChange={handlePassword}
        //         />
        //         <input type="submit" value="Register" />
        //     </form>
        // </div>
    );
};

export default Register;
