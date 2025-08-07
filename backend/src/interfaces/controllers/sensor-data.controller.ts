import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { FileSensorDataRepository } from '../../infrastructure/repositories/file-sensor-data.repository';
import { GetAllSensorData } from 'src/application/use-cases/get-all-sensor-data.use-case';
import { CreateSensorDataDto } from '../dtos/create-sensor-data.dto';
@Controller('/api/sensor-data')
export class SensorDataController {
  private repo = new FileSensorDataRepository();

  @Get()
  async getAll() {
    const usecase = new GetAllSensorData(this.repo);
    return usecase.execute();
  }

  @Post()
  async create(@Body() dto: CreateSensorDataDto) {
    const id = Date.now(); // simple ID
    const data = { id, ...dto };
    return this.repo.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.repo.delete(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateSensorDataDto>,
  ) {
    return this.repo.update(Number(id), dto);
  }
}
