import axios from "axios"
import { useAppSelector } from "../../app/hooks";
import { selectAccessToken } from "../auth/authSlice";

export const getEvents = () => {
    return axios.get("/api/events/");
}

export const createEvent = () => {
    return axios.post("/api/events/", {
        user: {
            id: 1
        },
        title: "Event 1",
        overview: "Some event overview",
        date: "2013-01-29",
        street: "A Street",
        city: "City",
        state: "state",
        country: "country",
        zipcode: "zipcode"
    },
    {
        headers: {"Content-Type": "application/json", "Authorization": "JWT " + getToken()}
    });
}

export const deleteEvent = (eventId: number) => {
    return axios.delete('/api/events/' + eventId, {headers: {"Content-Type": "application/json", "Authorization": "JWT " + getToken()}});
}

const getToken = () => {
    return useAppSelector(selectAccessToken);
}

// {
//     "user": {
//         "id": 1
//     },
//     "title": "Event 1",
//     "overview": "Some event overview",
//     "date": "2013-01-29",
//     "street": "A Street",
//     "city": "City",
//     "state": "state",
//     "country": "country",
//     "zipcode": "zipcode"
// }

// {
//     "owner": 1,
//     "title": "Event 1",
//     "overview": "Some event overview",
//     "date": "2013-01-29",
//     "street": "A Street",
//     "city": "City",
//     "state": "state",
//     "country": "country",
//     "zipcode": "zipcode"
// }