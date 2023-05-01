import {
    useDisclosure,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Box,
    DrawerFooter,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    CreatedEvent,
    createEventAsync,
    getEventsAsync,
    selectEvent,
} from "./eventsSlice";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

interface ChildProps {
    onRerender: () => void;
}

const CreateEvent = (props: ChildProps) => {
    const [redirect, setRedirect] = useState(false);
    const { onRerender } = props;
    const [data, setData] = useState<CreatedEvent>({
        title: "",
        overview: "",
        date: new Date(),
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();
    const _event = useAppSelector(selectEvent);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEventsAsync());
    }, [dispatch]);

    const handleClick = () => {
        // setSize(newSize);
        onOpen();
    };

    const onCloseDrawer = () => {
        console.log("Do something...");
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const onSubmit = () => {
        dispatch(createEventAsync(data));
        setData({
            title: "",
            overview: "",
            date: new Date(),
        });
        dispatch(getEventsAsync());
        onRedirect();
        onRerender();
        onClose();
        window.history.pushState(null, "", "/events/");
    };

    const onRedirect = () => {
        setRedirect(true);
    };

    if (redirect && _event.id > 0)
        return <Navigate to={`/dashboard/${_event.id}/`} replace />;

    return (
        <>
            <Button onClick={() => handleClick()} key={"full"} m={4}>
                Create Event
            </Button>

            <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create Event</DrawerHeader>
                    <DrawerBody>
                        <DrawerBody>
                            <Stack spacing="24px">
                                <Box>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Pleas enter the title of the event"
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel htmlFor="overview">
                                        Overview
                                    </FormLabel>
                                    <Input
                                        id="overview"
                                        name="overview"
                                        placeholder="Please enter the event overview"
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel htmlFor="date">
                                        Overview
                                    </FormLabel>
                                    <Input
                                        id="date"
                                        name="date"
                                        placeholder="Please enter the date of the event"
                                        onChange={handleChange}
                                        type="datetime-local"
                                    />
                                </Box>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={onSubmit}>
                                Submit
                            </Button>
                        </DrawerFooter>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CreateEvent;
