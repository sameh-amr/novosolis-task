import { configureStore } from '@reduxjs/toolkit';
import { sensorReducer } from '../features/sensor-data/store/sensoreslice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    sensors: sensorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;