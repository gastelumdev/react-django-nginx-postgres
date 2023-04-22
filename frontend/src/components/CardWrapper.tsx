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
import { ReactElement } from "react";
import { FcPlanner } from "react-icons/fc";
import { TEvent } from "../features/events/eventsSlice";
import { Link } from "react-router-dom";

interface CardProps {
    id: number;
    heading: string;
    description: string;
    icon: ReactElement;
    setCard(id: number): void;
}

const Card = ({ id, heading, description, icon, setCard }: CardProps) => {
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
                    to={`/dashboard/${id}`}
                    onClick={() => {
                        setCard(id);
                        console.log(id);
                    }}
                    // variant={"link"}
                    // colorScheme={"blue"}
                    // size={"sm"}
                >
                    View event
                </Link>
            </Stack>
        </Box>
    );
};

interface CardWrapperProps {
    title: string;
    instruction: string;
    events: Array<TEvent>;
    setCard(id: number): void;
}

export default function CardWrapper({
    title,
    instruction,
    events,
    setCard,
}: CardWrapperProps) {
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
                                id={event.id}
                            />
                        );
                    })}
                </Flex>
            </Container>
        </Box>
    );
}
