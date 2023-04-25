import axios from "axios"

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
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const deleteEvent = (eventId: number) => {
    return axios.delete('/api/events/' + eventId, { withCredentials: true });
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