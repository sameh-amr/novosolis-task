export interface SensorData {
  id: number;
  device_id: string;
  timestamp: string; // ISO format
  temperature: number;
  humidity: number;
}