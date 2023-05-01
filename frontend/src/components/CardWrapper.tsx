import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { FcPlanner } from "react-icons/fc";
import { TEvent, getEventsAsync } from "../features/events/eventsSlice";
import { Link, Navigate } from "react-router-dom";
import CreateEvent from "../features/events/CreateEvent";
import EditEvent from "../features/events/EditEvent";
import { useAppDispatch } from "../app/hooks";

interface CardProps {
    event: TEvent;
    heading: string;
    description: string;
    icon: ReactElement;
    setCard(id: number): void;
    deleteEvent(id: number): void;
    onRerender(): void;
}

const Card = ({
    event,
    heading,
    description,
    icon,
    setCard,
    deleteEvent,
    onRerender,
}: CardProps) => {
    return (
        <Box
            maxW={{ base: "full", md: "275px" }}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
        >
            <Stack align={"start"} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={"center"}
                    justify={"center"}
                    color={"white"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.100", "gray.700")}
                >
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={"sm"}>
                        {description}
                    </Text>
                </Box>
                <Link
                    to={`/dashboard/${event.id}`}
                    onClick={() => {
                        setCard(event.id);
                        console.log(event.id);
                    }}
                    // variant={"link"}
                    // colorScheme={"blue"}
                    // size={"sm"}
                >
                    View event
                </Link>
                <button
                    onClick={() => {
                        deleteEvent(event.id);
                    }}
                >
                    Delete
                </button>
                <EditEvent onRerender={onRerender} _event={event} />
            </Stack>
        </Box>
    );
};

interface CardWrapperProps {
    title: string;
    instruction: string;
    events: Array<TEvent>;
    setCard(id: number): void;
    deleteEvent(id: number): void;
    onRerender(): void;
}

export default function CardWrapper({
    title,
    instruction,
    events,
    setCard,
    deleteEvent,
    onRerender,
}: CardWrapperProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEventsAsync());
    }, [dispatch]);
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                <Heading
                    fontSize={{ base: "2xl", sm: "4xl" }}
                    fontWeight={"bold"}
                >
                    {title}
                </Heading>
                <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
                    {instruction}
                </Text>
            </Stack>

            <Container maxW={"5xl"} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    {events.map((event) => {
                        return (
                            <Card
                                key={event.id}
                                heading={event.title}
                                icon={<Icon as={FcPlanner} w={10} h={10} />}
                                description={event.overview}
                                setCard={setCard}
                                event={event}
                                deleteEvent={deleteEvent}
                                onRerender={onRerender}
                            />
                        );
                    })}
                </Flex>
            </Container>
        </Box>
    );
}
