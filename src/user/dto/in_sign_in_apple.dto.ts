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

  @ApiProperty({
    example: 'klsdfjklsdjf',
    description: 'firebaseToken',
    required: true,
  })
  @IsNotEmpty()
  firebaseToken: string;
}
