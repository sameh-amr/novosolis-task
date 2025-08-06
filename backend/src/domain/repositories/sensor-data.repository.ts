import { SensorData } from '../entities/sensor-data.entity';

export interface ISensorDataRepository {
  findAll(): Promise<SensorData[]>;
  create(data: SensorData): Promise<SensorData>;
  delete(id: number): Promise<void>;
  update(id: number, data: Partial<SensorData>): Promise<SensorData>;
}
