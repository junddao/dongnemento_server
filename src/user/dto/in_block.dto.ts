import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class InBlockDto {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  userId: ObjectId;

  @ApiProperty({
    example: 'true / false',
    description: '차단',
    required: true,
  })
  @IsNotEmpty()
  isBlocked: boolean;
}
