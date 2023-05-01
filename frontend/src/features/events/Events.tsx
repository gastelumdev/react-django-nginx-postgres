import { AsyncThunkAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Dispatch, AnyAction } from "redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signinAsync, logout, logoutAsync } from "../auth/authSlice";
import {
    getEventsAsync,
    selectEvents,
    TEvent,
    setEventId,
    selectEventId,
    deleteEventAsync,
} from "./eventsSlice";
import NavBar from "../../components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import CardWrapper from "../../components/CardWrapper";
import CreateEvent from "./CreateEvent";

const Events = () => {
    const events = useAppSelector(selectEvents);
    const eventId = useAppSelector(selectEventId);

    const dispatch = useAppDispatch();

    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        dispatch(getEventsAsync());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutAsync());
    };

    const handleSetEventId = (eventId: number) => {
        dispatch(setEventId(eventId));
        localStorage.setItem("lsEventId", JSON.stringify(eventId));
    };
    const handleDeleteEvent = (eventId: number) => {
        dispatch(deleteEventAsync(eventId));
    };
    const onRerender = () => {
        dispatch(getEventsAsync());
        setRerender(!rerender);
        console.log(rerender);
    };
    return (
        <ChakraProvider>
            <NavBar logout={handleLogout} />
            <CreateEvent onRerender={onRerender} />
            <CardWrapper
                title="Events"
                instruction="Start by creating an event or select one below."
                events={events}
                setCard={handleSetEventId}
                deleteEvent={handleDeleteEvent}
                onRerender={onRerender}
            />
        </ChakraProvider>
    );
};

export default Events;
