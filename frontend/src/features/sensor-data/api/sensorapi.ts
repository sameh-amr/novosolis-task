import { Sensor } from '../types/sensor';
import apiClient from '../../../shared/api/client';

export const fetchSensors = (): Promise<Sensor[]> => apiClient.get('/sensor-data');
export const createSensor = (sensor: Omit<Sensor, 'id'>): Promise<Sensor> =>
  apiClient.post('/sensor-data', sensor);
export const deleteSensor = (id: number): Promise<void> => apiClient.delete(`/sensor-data/${id}`);
export const updateSensor = (id: number, sensor: Sensor): Promise<void> => {
  return apiClient.put(`/sensor-data/${id}`, sensor);
};
