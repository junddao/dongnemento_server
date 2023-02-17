import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinModule } from 'src/pin/pin.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';
import { Report, ReportSchema } from './schemas/report.schema';

@Module({
  imports: [
    PinModule,
    UserModule,
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
  ],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
})
export class ReportModule {}
