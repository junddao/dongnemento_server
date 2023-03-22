import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { InCreateReportDto } from './dto/in_create_report.dto';
import { ReportService } from './report.service';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: 'Report 생성' })
  @Post('/create')
  @UseGuards(AuthGuard())
  async createReport(
    @Body() inCreateReportDto: InCreateReportDto,
  ): Promise<ResponseDto<null>> {
    await this.reportService.createReport(inCreateReportDto);
    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
