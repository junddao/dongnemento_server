import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import CategoryType from '../enum/category_types';
import { PinDocument } from '../schemas/pin.schema';

export class OutGetPinsDto {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '22.232323',
    description: '위도',
    required: true,
  })
  @IsNotEmpty()
  lat: number;

  @ApiProperty({
    example: '126.222222',
    description: '경도',
    required: true,
  })
  @IsNotEmpty()
  lng: number;

  @ApiProperty({
    example: '홍길동',
    description: '핀 생성 유저의 id',
    required: true,
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '홍길동',
    description: '핀 생성 유저의 id',
    required: true,
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'false',
    description: '핀 생성 유저의 block 상태',
    required: true,
    default: false,
  })
  @IsNotEmpty()
  isUserBlocked: boolean;

  @ApiProperty({
    example: 'DAILY',
    description: 'pin의 카테고리',
    required: true,
  })
  @IsEnum(CategoryType) // IsEnum 데코레이터를 사용하여 해당 필드가 Enum 타입임을 명시
  category: CategoryType; // Enum 타입을 지정한 필드

  @ApiProperty({
    example: '33',
    description: 'pin의 카테고리 점수',
    required: true,
  })
  categoryScore: number;

  @ApiProperty({
    example: '33',
    description: '좋아요 갯수',
    required: false,
    default: 0,
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
    description: '댓글갯수',
    required: true,
    default: 0,
  })
  @IsNotEmpty()
  replyCount: number;

  @ApiProperty({
    example: '제목입니다.',
    description: '제목',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '이미지들.',
    description: '이미지 주소',
  })
  @IsNotEmpty()
  images: string[] | null;

  @ApiProperty({
    example: '내용입니다.',
    description: '내용',
    required: false,
  })
  @IsNotEmpty()
  body: string;

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

  static from(pin: PinDocument): OutGetPinsDto {
    const outGetPinsDto = new OutGetPinsDto();
    outGetPinsDto.id = pin.id;
    outGetPinsDto.lat = pin.lat;
    outGetPinsDto.lng = pin.lng;
    outGetPinsDto.userId = pin.authorUser.id;
    outGetPinsDto.isUserBlocked = pin.authorUser.isBlocked ?? false;
    outGetPinsDto.userName = pin.authorUser.name;
    outGetPinsDto.title = pin.title;
    outGetPinsDto.category = pin.category;
    outGetPinsDto.categoryScore = pin.categoryScore;
    outGetPinsDto.images = pin.images;
    outGetPinsDto.body = pin.body;
    outGetPinsDto.createdAt = pin.createdAt;
    outGetPinsDto.updatedAt = pin.updatedAt;
    return outGetPinsDto;
  }
}
