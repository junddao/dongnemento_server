import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InCreateLikeDto {
  @ApiProperty({
    example: 'pinID',
    description: 'pinId',
    required: true,
  })
  @IsNotEmpty()
  pinId: string | null;

  @ApiProperty({
    example: 'replyID',
    description: 'reply ID',
    required: true,
  })
  @IsNotEmpty()
  replyId: string | null;
}
