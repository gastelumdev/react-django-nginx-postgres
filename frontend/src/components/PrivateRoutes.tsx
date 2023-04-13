import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Dispatch, AnyAction } from "redux";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
    getSessionAsync,
    selectSession,
    selectStatus,
} from "../features/auth/authSlice";

const PrivateRoutes = () => {
    const isAuthenticated = useAppSelector(selectSession);
    const status = useAppSelector(selectStatus);
    console.log("PrivateRoute: ", isAuthenticated);

    if (status === "loading") {
        console.log("Spinning!");
        return null;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login/" replace />;
};

export default PrivateRoutes;
