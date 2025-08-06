import { ISensorDataRepository } from '../../domain/repositories/sensor-data.repository';

export class DeleteSensorData {
  constructor(private repo: ISensorDataRepository) {}

  async execute(id: number) {
    return this.repo.delete(id);
  }
}