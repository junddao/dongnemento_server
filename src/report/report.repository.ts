import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InCreateReportDto } from './dto/in_create_report.dto';
import { Report, ReportDocument } from './schemas/report.schema';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async createReport(InCreateReportDto: InCreateReportDto): Promise<Report> {
    const newReport = new this.reportModel(InCreateReportDto);
    return newReport.save();
  }
}
