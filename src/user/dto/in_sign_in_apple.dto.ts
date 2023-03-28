import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InSignInAppleDto {
  @ApiProperty({
    example: 'klsdfjklsdjf',
    description: 'idToken',
    required: true,
  })
  @IsNotEmpty()
  idToken: string;
}
