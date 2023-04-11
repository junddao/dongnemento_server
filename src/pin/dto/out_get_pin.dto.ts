import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PinDocument } from './../schemas/pin.schema';

export class OutGetPinDto {
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
    example: '홍길동',
    description: '핀 생성 유저의 id',
    required: true,
  })
  @IsNotEmpty()
  userProfileImage: string;

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

  static from(pin: PinDocument): OutGetPinDto {
    const outGetPinDto = new OutGetPinDto();
    outGetPinDto.id = pin.id;
    outGetPinDto.lat = pin.lat;
    outGetPinDto.lng = pin.lng;
    outGetPinDto.userId = pin.authorUser.id;
    outGetPinDto.userProfileImage = pin.authorUser.profileImage;
    outGetPinDto.userName = pin.authorUser.name;
    outGetPinDto.title = pin.title;
    outGetPinDto.images = pin.images;
    outGetPinDto.body = pin.body;
    outGetPinDto.likeCount = pin.likeCount;
    outGetPinDto.isLiked = pin.isLiked;
    outGetPinDto.hateCount = pin.hateCount;
    outGetPinDto.isHated = pin.isHated;
    outGetPinDto.createdAt = pin.createdAt;
    outGetPinDto.updatedAt = pin.updatedAt;

    return outGetPinDto;
  }
}
