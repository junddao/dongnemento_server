import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InCreatePinDto {
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
    example: '제목입니다.',
    description: '제목',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '이미지.',
    description: '이미지',
    required: true,
  })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({
    example: '내용입니다.',
    description: '내용',
    required: false,
  })
  @IsNotEmpty()
  body: string;
}
