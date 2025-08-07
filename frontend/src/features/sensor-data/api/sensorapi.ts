import type { Sensor } from '../types/sensor';
import apiClient from '../../../shared/api/client';
import type { AxiosResponse } from 'axios';

export const fetchSensors = async (): Promise<Sensor[]> => {
  const response: AxiosResponse<Sensor[]> = await apiClient.get('/sensor-data');
  return response.data;
};

export const createSensor = async (sensor: Omit<Sensor, 'id'>): Promise<Sensor> => {
  const response: AxiosResponse<Sensor> = await apiClient.post('/sensor-data', sensor);
  return response.data;
};

export const deleteSensor = async (id: number): Promise<void> => {
  await apiClient.delete(`/sensor-data/${id}`);
};

export const updateSensor = async (id: number, sensor: Sensor): Promise<void> => {
  await apiClient.put(`/sensor-data/${id}`, sensor);
};
