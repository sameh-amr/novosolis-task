import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SensorDataController } from './interfaces/controllers/sensor-data.controller';

@Module({
  imports: [],
  controllers: [SensorDataController],
  providers: [AppService],
})
export class AppModule {}
