import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InCreateHateDto {
  @ApiProperty({
    example: 'pinID',
    description: 'pinId',
    required: true,
  })
  @IsNotEmpty()
  pinId: string | null;

  // @ApiProperty({
  //   example: 'replyID',
  //   description: 'reply ID',
  // })
  // @IsNotEmpty()
  // replyId: string | null;
}
