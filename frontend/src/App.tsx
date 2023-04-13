import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
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
import Register from "./features/auth/Register";
import Events from "./features/events/Events";

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
    const [isAuthenticated, setIsAuthenticated] = useState(
        useAppSelector(selectSession)
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSessionAsync());
    }, [dispatch]);

    console.log("App: ", isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Events />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
