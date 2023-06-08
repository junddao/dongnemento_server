import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import CategoryType from '../enum/category_types';

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
    example: '내용입니다.',
    description: '내용',
    required: false,
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example: '2021-01-01',
    description: '시작 날짜',
    required: true,
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    example: '2021-01-01',
    description: '종료 날짜',
    required: true,
  })
  @IsNotEmpty()
  endDate: Date;
}
