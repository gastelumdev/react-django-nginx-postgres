import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { createEvent, deleteEvent, getEvents } from './eventsAPI';

export interface TEvent {
    id: number;
    title: string;
    overview: string;
    owner: number;
    date: Date;
}

export interface EventState {
    eventId: number;
    events: Array<TEvent>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: EventState = {
    eventId: 0,
    events: [],
    status: 'loading',
}

export const getEventsAsync = createAsyncThunk(
    'events/getEvents',
    async () => {
        const response = await getEvents();
        console.log(response.data);
        return response.data;
    }
)

export const createEventAsync = createAsyncThunk(
    'events/createEvent',
    async () => {
        const response = await createEvent();
        return response.data;
    }
)

export const deleteEventAsync = createAsyncThunk(
    'events/deleteEvent',
    async (eventId: number) => {
        const response = await deleteEvent(eventId);
        return response.data;
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
        })
        .addCase(createEventAsync.rejected, (state) => {
            state.status = 'failed'
        })
        .addCase(deleteEventAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteEventAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        })
        .addCase(deleteEventAsync.rejected, (state) => {
            state.status = 'failed'
        })
    }
});

export const selectEvents = (state: RootState) => state.events.events;
export const selectEventId = (state: RootState) => state.events.eventId;
const {actions, reducer} = eventSlice;
export const {setEventId} = actions;

export default eventSlice.reducer;