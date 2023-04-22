import React, { useState } from "react";
import DashboardNav from "./DashboardNav";
import {
    Box,
    ChakraProvider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks";
import { selectEventId } from "../features/events/eventsSlice";
import DataTable from "react-data-table-component";

const columns = [
    {
        name: "Title",
        selector: (row: { title: any }) => row.title,
        sortable: true,
    },
    {
        name: "Year",
        selector: (row: { year: any }) => row.year,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: "Beetlejuice",
        year: "1988",
    },
    {
        id: 2,
        title: "Ghostbusters",
        year: "1984",
    },
];

const Dashboard = () => {
    // const eventId = useAppSelector(selectEventId);
    const [eventId, setEventId] = useState(() => {
        const saved = localStorage.getItem("lsEventId") || "";
        const inittialValue = JSON.parse(saved);
        return inittialValue || "";
    });
    return (
        <ChakraProvider>
            <DashboardNav>
                {/* <h1>{eventId}</h1> */}
                <Box
                    // maxW={{ base: "full", md: "275px" }}
                    bg="white"
                    w={"full"}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={5}
                >
                    <DataTable
                        columns={columns}
                        data={data}
                        selectableRows
                        pagination
                    />
                    {/* <TableContainer>
                        <Table size="sm" variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>To convert</Th>
                                    <Th>into</Th>
                                    <Th isNumeric>multiply by</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td isNumeric>25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td>feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td isNumeric>30.48</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer> */}
                </Box>
            </DashboardNav>
        </ChakraProvider>
    );
};

export default Dashboard;
