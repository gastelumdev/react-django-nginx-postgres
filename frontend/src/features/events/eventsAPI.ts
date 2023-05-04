import axios from "axios"
import { useAppSelector } from "../../app/hooks";
import { selectAccessToken } from "../auth/authSlice";
import { CreatedEvent, TEvent } from "./eventsSlice";

export const getEvents = () => {
    return axios.get("/api/events/", {
        headers: {"Content-Type": "application/json", "Authorization": "JWT " + getToken()}
    });
}

export const createEvent = (data: CreatedEvent) => {
    return axios.post(process.env.HOST + "/api/events/", {...data, owner: localStorage.getItem("userId")},
    {
        headers: {"Content-Type": "application/json", "Authorization": "JWT " + getToken()}
    });
}

export const deleteEvent = (eventId: number) => {
    return axios.delete(process.env.HOST + "/api/events/" + eventId, {headers: {"Content-Type": "application/json", "Authorization": "JWT " + getToken()}});
}

export const editEvent = (data: TEvent) => {
    return axios.put(`${process.env.HOST}/api/events/${data.id}/`, data, {headers: {"Content-Type": "application/json", "Authorization": "JWT " + getToken()}})
}

const getToken = () => {
    return localStorage.getItem('token')
}

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
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