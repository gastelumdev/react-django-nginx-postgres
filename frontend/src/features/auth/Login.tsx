import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getSessionAsync, selectSession } from "./authSlice";

export function Login() {
    const isAuthenticated = useAppSelector(selectSession);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSessionAsync());
    }, []);

    return (
        <div>
            <button onClick={() => dispatch(getSessionAsync())}>
                Get Session
            </button>
            {isAuthenticated ? <p>We're Good</p> : <p>We're not good</p>}
        </div>
    );
}
