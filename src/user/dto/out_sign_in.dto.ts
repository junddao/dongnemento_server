import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OutSignInDto {
  @ApiProperty({
    example: 'jwt',
    description: 'token',
    required: true,
  })
  @IsNotEmpty()
  accessToken: string;
}
