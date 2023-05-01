import React, { useEffect, useState } from "react";
import {
    CreatedEvent,
    TEvent,
    editEventAsync,
    getEventsAsync,
} from "./eventsSlice";
import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    FormLabel,
    Input,
    DrawerFooter,
    Box,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../app/hooks";
import { Navigate } from "react-router-dom";

interface PropsType {
    _event: TEvent;
    onRerender(): void;
}

const EditEvent = (props: PropsType) => {
    const [redirect, setRedirect] = useState(false);
    const { _event, onRerender } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState<TEvent>(_event);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEventsAsync());
    }, [dispatch]);

    const handleClick = () => {
        // setSize(newSize);
        onOpen();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const onSubmit = () => {
        console.log(_event);
        dispatch(
            editEventAsync({
                id: _event.id,
                owner: _event.owner,
                title: data.title,
                overview: data.overview,
                date: new Date(data.date),
            })
        );
        // setData({
        //     title: "",
        //     overview: "",
        //     date: new Date(),
        // });
        dispatch(getEventsAsync());
        onRedirect();
        onRerender();
        onClose();
    };

    const onRedirect = () => {
        setRedirect(true);
    };

    if (redirect) return <Navigate to={`/dashboard/${_event.id}/`} replace />;

    return (
        <>
            <button onClick={() => handleClick()}>Edit Event</button>

            <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit Event</DrawerHeader>
                    <DrawerBody>
                        <DrawerBody>
                            <Stack spacing="24px">
                                {" "}
                                */
                                <Box>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Pleas enter the title of the event"
                                        onChange={handleChange}
                                        value={data.title}
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
                                        value={data.overview}
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
                                        // value={_event.date}
                                        value={new Date(data.date)
                                            .toISOString()
                                            .slice(0, -8)}
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

export default EditEvent;
