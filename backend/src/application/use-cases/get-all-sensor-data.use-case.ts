import { ISensorDataRepository } from '../../domain/repositories/sensor-data.repository';

export class GetAllSensorData {
  constructor(private repo: ISensorDataRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
