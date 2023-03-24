import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InSignInAppleDto {
  @ApiProperty({
    example: 'junddao@apple.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자명',
    required: false,
  })
  name: string;

  @ApiProperty({
    example: 'https://aaaaa.com',
    description: '프로필 사진 경로',
    required: false,
  })
  profileImage: string;
}
