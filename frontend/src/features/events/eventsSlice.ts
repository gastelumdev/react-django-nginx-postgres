import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { createEvent, deleteEvent, editEvent, getEvents } from './eventsAPI';

export interface TEvent {
    id: number;
    title: string;
    overview: string;
    owner: number;
    date: Date;
}

export interface CreatedEvent {
    title: string;
    overview: string;
    date: Date;
}

export interface EventState {
    eventId: number;
    event: TEvent | {id: 0};
    events: Array<TEvent>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: EventState = {
    eventId: 0,
    event: {id: 0},
    events: [],
    status: 'loading',
}

export const getEventsAsync = createAsyncThunk(
    'events/getEvents',
    async () => {
        const response = await getEvents();
        return response.data;
    }
)

export const createEventAsync = createAsyncThunk(
    'events/createEvent',
    async (data: CreatedEvent) => {
        console.log(data)
        const response = await createEvent(data);
        return response.data;
    }
)

export const editEventAsync = createAsyncThunk(
    'events/editEvent',
    async (data: TEvent) => {
        console.log(data);
        const response = await editEvent(data);
        return response.data;
    }
)

export const deleteEventAsync = createAsyncThunk(
    'events/deleteEvent',
    async (eventId: number) => {
        const deleteResponse = await deleteEvent(eventId);
        const eventsResponse = await getEvents();
        return eventsResponse.data;
    }
)

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEventId: (state, action) => {
            state.eventId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEventsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getEventsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.events = action.payload;
        })
        .addCase(getEventsAsync.rejected, (state) => {
            state.status = 'failed'
        })
        .addCase(createEventAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createEventAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.event = action.payload;
            state.eventId = action.payload.id;
        })
        .addCase(createEventAsync.rejected, (state) => {
            state.status = 'failed'
        })
        .addCase(deleteEventAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteEventAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.events = action.payload;
        })
        .addCase(deleteEventAsync.rejected, (state) => {
            state.status = 'failed'
        })
    }
});

export const selectEvents = (state: RootState) => state.events.events;
export const selectEventId = (state: RootState) => state.events.eventId;
export const selectEvent = (state: RootState) => state.events.event;
const {actions, reducer} = eventSlice;
export const {setEventId} = actions;

export default eventSlice.reducer;