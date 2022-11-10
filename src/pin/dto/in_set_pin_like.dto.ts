import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class InSetPinLike {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  _id: ObjectId;

  @ApiProperty({
    example: 'bool',
    description: '좋아요 눌렀는지 여부',
    required: false,
  })
  @IsNotEmpty()
  isLiked: boolean;
}
