import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InCreateReportDto {
  @ApiProperty({
    example: 'pinId',
    description: 'pinId',
    required: true,
  })
  @IsNotEmpty()
  pinId: string;
}
