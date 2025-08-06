import { ISensorDataRepository } from '../../domain/repositories/sensor-data.repository';
import { SensorData } from '../../domain/entities/sensor-data.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/sensor-data.json');

export class FileSensorDataRepository implements ISensorDataRepository {
  private async readFile(): Promise<SensorData[]> {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  }

  private async writeFile(data: SensorData[]) {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  }

  async findAll(): Promise<SensorData[]> {
    return this.readFile();
  }

  async create(entry: SensorData): Promise<SensorData> {
    const data = await this.readFile();
    data.push(entry);
    await this.writeFile(data);
    return entry;
  }

  async delete(id: number): Promise<void> {
    const data = await this.readFile();
    const filtered = data.filter((item) => item.id !== id);
    await this.writeFile(filtered);
  }

  async update(id: number, update: Partial<SensorData>): Promise<SensorData> {
    const data = await this.readFile();
    const index = data.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Not found');
    data[index] = { ...data[index], ...update };
    await this.writeFile(data);
    return data[index];
  }
}
