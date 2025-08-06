import { SensorData } from 'src/domain/entities/sensor-data.entity';
import { ISensorDataRepository } from '../../domain/repositories/sensor-data.repository';

export class CreateSensorData {
  constructor(private repo: ISensorDataRepository) {}

  async execute(data: SensorData) {
    return this.repo.create(data);
  }
}