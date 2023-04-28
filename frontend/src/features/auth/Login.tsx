import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    // getSessionAsync,
    // loginAsync,
    selectCSRF,
    selectSession,
    signinAsync,
    // setCSRFAsync,
} from "./authSlice";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    ChakraProvider,
} from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

export function Login() {
    const isAuthenticated = useAppSelector(selectSession);
    const csrf = useAppSelector(selectCSRF);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        dispatch(signinAsync({ username, password }));
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <ChakraProvider>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>
                            Sign in to your account
                        </Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            to enjoy all of our cool{" "}
                            <Link to="/">features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="text" onChange={handleUsername} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    onChange={handlePassword}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                {/* <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={"blue.400"}>
                                        Forgot password?
                                    </Link>
                                </Stack> */}
                                <Button
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </Button>
                                <Stack pt={6}>
                                    <Text align={"center"}>
                                        Need to signup?{" "}
                                        <Link to="/register">Register</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </ChakraProvider>
    );
}
