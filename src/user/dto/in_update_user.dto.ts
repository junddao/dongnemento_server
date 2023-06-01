import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InUpdateUserDto {
  @ApiProperty({
    example: 'junddao@kakao.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자명',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: '안녕하세요. 미로입니다.',
    description: '소개글',
    required: false,
  })
  @IsNotEmpty()
  introduce: string;

  @ApiProperty({
    example: 'https://aaaa.com',
    description: '프로필 사진 경로',
    required: true,
  })
  @IsNotEmpty()
  profileImage: string;

  @ApiProperty({
    example: '26.232323',
    description: '위도',
    required: true,
  })
  @IsNotEmpty()
  lat: number | null;

  @ApiProperty({
    example: '23.222222',
    description: '경도',
    required: true,
  })
  @IsNotEmpty()
  lng: number | null;

  @ApiProperty({
    example: '운중동 912',
    description: '내 위치 주소',
    required: true,
  })
  @IsNotEmpty()
  address: string | null;

  // @IsNotEmpty()
  // status (signed, active, left)

  @ApiProperty({
    example: 'true / false',
    description: 'push 여부',
    required: false,
  })
  @IsNotEmpty()
  pushEnabled: boolean;

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
