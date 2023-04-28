import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Dispatch, AnyAction } from "redux";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
    // getSessionAsync,
    selectSession,
    selectStatus,
    selectUser,
} from "../features/auth/authSlice";

const PrivateRoutes = () => {
    // const isAuthenticated = false;
    const status = useAppSelector(selectStatus);
    const isAuthenticated = useAppSelector(selectSession);
    const userId = localStorage.getItem("userId");
    console.log("PrivateRoute: ", isAuthenticated);

    if (status === "loading") {
        console.log("Spinning!");
        return null;
    }

    if (isAuthenticated || localStorage.getItem("token") !== "") {
        console.log("Private route allows access");
        return <Outlet />;
    } else {
        console.log("Private route redirects to login");
        return <Navigate to="/login/" replace />;
    }
    // return user != null ? <Outlet /> : <Navigate to="/login/" replace />;
};

export default PrivateRoutes;
