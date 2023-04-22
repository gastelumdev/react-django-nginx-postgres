import { AsyncThunkAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Dispatch, AnyAction } from "redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync } from "../auth/authSlice";
import {
    getEventsAsync,
    selectEvents,
    TEvent,
    setEventId,
    selectEventId,
} from "./eventsSlice";
import NavBar from "../../components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import CardWrapper from "../../components/CardWrapper";

const Events = () => {
    const events = useAppSelector(selectEvents);
    const eventId = useAppSelector(selectEventId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEventsAsync());
        console.log("We fetched EventAsync");
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutAsync());
    };

    const handleSetEventId = (eventId: number) => {
        dispatch(setEventId(eventId));
        localStorage.setItem("lsEventId", JSON.stringify(eventId));
    };
    return (
        <ChakraProvider>
            <NavBar logout={handleLogout} />
            <CardWrapper
                title="Events"
                instruction="Start by creating an event or select one below."
                events={events}
                setCard={handleSetEventId}
            />
        </ChakraProvider>
    );
};

export default Events;
