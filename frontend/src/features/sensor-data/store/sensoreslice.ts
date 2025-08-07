import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sensor, SensorState } from '../types/sensor';



const initialState: SensorState = {
  data: [],
  loading: false,
  error: null,
};

export const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSensors: (state, action: PayloadAction<Sensor[]>) => {
      state.data = action.payload;
    },
    addSensor: (state, action: PayloadAction<Sensor>) => {
      state.data.push(action.payload);
    },
    removeSensor: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(sensor => sensor.id !== action.payload);
    },
  },
});

export const { setLoading, setError, setSensors, addSensor, removeSensor } = sensorSlice.actions;
export const sensorReducer = sensorSlice.reducer;