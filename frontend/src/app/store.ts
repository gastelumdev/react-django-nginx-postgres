import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/auth/authSlice';
import eventsReducer from '../features/events/eventsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: loginReducer,
    events: eventsReducer,
  },
});

// export const state = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;