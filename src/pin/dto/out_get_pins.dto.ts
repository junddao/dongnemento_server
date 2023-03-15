import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class OutGetPinsDto {
  @ApiProperty({
    example: '62ab12a23e9e123a2c054f',
    description: 'id',
    required: true,
  })
  @IsNotEmpty()
  _id: ObjectId;

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
  userId: ObjectId;

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

  // static from(pins: Pin[]): OutGetPinsDto[] {
  //   const newPins = [];
  //   for (const pin of pins) {
  //     const outGetPinDto = new OutGetPinsDto();
  //     outGetPinDto._id = pin._id;
  //     outGetPinDto.lat = pin.lat;
  //     outGetPinDto.lng = pin.lng;
  //     outGetPinDto.userId = pin.user._id;
  //     outGetPinDto.title = pin.title;
  //     outGetPinDto.images = pin.images;
  //     outGetPinDto.body = pin.body;
  //     outGetPinDto.createdAt = pin.createdAt;
  //     outGetPinDto.updatedAt = pin.updatedAt;
  //     newPins.push(pin);
  //   }

  //   return newPins;
  // }
}
