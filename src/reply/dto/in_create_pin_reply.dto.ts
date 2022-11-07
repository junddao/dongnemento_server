import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InCreatePinReplyDto {
  @ApiProperty({
    example: '23j4kjlkdfjs',
    description: '게시글 id',
    required: true,
  })
  @IsNotEmpty()
  pinId: string;

  @ApiProperty({
    example: 'akekdjjf23jdf',
    description: '대댓글 id',
  })
  @IsNotEmpty()
  targetReplyId: string | null;

  @ApiProperty({
    example: '댓글내용입니다.',
    description: '댓글 내용',
    required: true,
  })
  @IsNotEmpty()
  reply: string;
}
