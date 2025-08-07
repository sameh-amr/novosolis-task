export interface Sensor {
  id: number;
  device_id: string;
  timestamp: string;
  temperature: number;
  humidity: number;
}

export interface SensorState {
  data: Sensor[];
  loading: boolean;
  error: string | null;
}