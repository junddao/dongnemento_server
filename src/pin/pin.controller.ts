import { InGetPinsDto } from './dto/in_get_pins.dto';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PinService } from './pin.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { OutGetPinsDto } from './dto/out_get_pins.dto';

@ApiTags('pin')
@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @ApiOperation({ summary: 'Pin 생성' })
  @Post('/create')
  @UseGuards(AuthGuard())
  async createRecord(
    @Body() inCreatePinDto: InCreatePinDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.pinService.createPin(inCreatePinDto, user._id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @ApiOperation({ summary: 'Pin 생성' })
  @Post('/get/pins')
  @UseGuards(AuthGuard())
  async getPins(
    @Body() inGetPinsDto: InGetPinsDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<OutGetPinsDto>> {
    const data = await this.pinService.getPins(inGetPinsDto, user._id);
    return {
      success: true,
      error: null,
      data: data,
    };
  }
}
