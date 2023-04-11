import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OutGetPinRepliesDto {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '123wae534e',
    description: 'pinId',
    required: true,
  })
  @IsNotEmpty()
  pinId: string;

  @ApiProperty({
    example: 'adsf123wdwe',
    description: 'pin 꼽은 유저 id',
    required: true,
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '김춘식',
    description: '댓글 작성자 이름',
    required: true,
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'qweqwe123123',
    description: '리플 대상 리플의 id',
  })
  @IsNotEmpty()
  targetReplyId: string | null;

  @ApiProperty({
    example: '리플입니다.',
    description: '리플',
    required: true,
  })
  @IsNotEmpty()
  reply: string;

  @ApiProperty({
    example: '33',
    description: '좋아요 갯수',
    required: false,
  })
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    example: 'bool',
    description: '좋아요 눌렀는지 여부',
    required: false,
  })
  @IsNotEmpty()
  isLiked: boolean;

  @ApiProperty({
    example: '33',
    description: '싫어요 갯수',
    required: false,
  })
  @IsNotEmpty()
  hateCount: number;

  @ApiProperty({
    example: 'bool',
    description: '싫어요 눌렀는지 여부',
    required: false,
  })
  @IsNotEmpty()
  isHated: boolean;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '생성(ISO 8601 시간)',
    required: false,
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2017-03-16T17:40:00+09:00',
    description: '수정(ISO 8601 시간)',
    required: false,
  })
  @IsNotEmpty()
  updatedAt: Date;
}
