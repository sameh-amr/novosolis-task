import { SensorData } from 'src/domain/entities/sensor-data.entity';
import { ISensorDataRepository } from '../../domain/repositories/sensor-data.repository';

export class UpdateSensorData {
  constructor(private repo: ISensorDataRepository) {}

  async execute(id: number, data: Partial<SensorData>) {
    return this.repo.update(id, data);
  }
}