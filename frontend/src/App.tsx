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
    // logout,
    logoutAsync,
    // getSessionAsync,
    // loginAsync,
    // logoutAsync,
    selectCSRF,
    selectSession,
    setSession,
    // setCSRFAsync,
    signinAsync,
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
    // const eventId = useAppSelector(selectEventId);
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectSession);
    console.log("App:", isAuthenticated);

    useEffect(() => {
        dispatch(getSessionAsync());
        // window.location.reload();
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(getEventsAsync());
    //     console.log("We fetched EventAsync");
    // }, [dispatch]);

    // const signin = () => {
    //     dispatch(
    //         signinAsync({ username: "ogcollabtime", password: "Coll@b#2023" })
    //     );
    // };

    // const getSession = () => {
    //     dispatch(getSessionAsync());
    // };

    // const logout = () => {
    //     dispatch(logoutAsync());
    // };

    // console.log(isAuthenticated);

    // if (!isAuthenticated) {
    //     window.location.reload();
    // }

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
        // <>
        //     <button onClick={() => signin()}>Signin</button>
        //     <button onClick={() => getSession()}>Get Session</button>
        // </>
    );
}

export default App;
