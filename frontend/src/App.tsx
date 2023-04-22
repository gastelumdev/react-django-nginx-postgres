import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./components/Dashboard";
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
import { getEventsAsync, selectEventId } from "./features/events/eventsSlice";

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
    const eventId = useAppSelector(selectEventId);

    useEffect(() => {
        dispatch(getSessionAsync());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getEventsAsync());
        console.log("We fetched EventAsync");
    }, [dispatch]);

    console.log("App: ", isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Events />} />
                    <Route path="/dashboard/:id" element={<Dashboard />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
