import { InCreatePinDto } from './dto/in_create_pin.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { PinService } from './pin.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@ApiTags('pin')
@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @ApiOperation({ summary: 'Pin 생성' })
  @Post('/create')
  @UseGuards(AuthGuard())
  async createRecord(
    @Body() InCreatePinDto: InCreatePinDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.pinService.createPin(InCreatePinDto, user._id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
