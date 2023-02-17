import { Injectable } from '@nestjs/common';
import { InCreateReportDto } from './dto/in_create_report.dto';
import { ReportRepository } from './report.repository';
import { Report } from './schemas/report.schema';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async createReport(InCreateReportDto: InCreateReportDto): Promise<Report> {
    return this.reportRepository.createReport(InCreateReportDto);
  }
}
