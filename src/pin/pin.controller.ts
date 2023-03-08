import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ApiResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { InGetPinsDto } from './dto/in_get_pins.dto';
import { OutGetPinDto } from './dto/out_get_pin.dto';
import { OutGetPinsDto } from './dto/out_get_pins.dto';
import { PinService } from './pin.service';

@ApiTags('pin')
@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @ApiOperation({ summary: 'Pin 생성' })
  @Post('/create')
  @UseGuards(AuthGuard())
  async createPin(
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

  @ApiOperation({ summary: '위치기준 특정 거리 안에 pin들 조회' })
  @Post('/get/pins')
  @UseGuards(AuthGuard())
  async getPins(
    @Body() inGetPinsDto: InGetPinsDto,
  ): Promise<ResponseDto<OutGetPinsDto>> {
    const data = await this.pinService.getPins(inGetPinsDto);
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: 'pin 조회' })
  @ApiResponseDto(OutGetPinDto)
  @Get('/get/:id')
  @UseGuards(AuthGuard())
  async getPin(
    @Param('id') id: ObjectId,
    @GetUser() user: User,
  ): Promise<ResponseDto<OutGetPinDto>> {
    const data = await this.pinService.getPin(id, user._id);
    const newData: OutGetPinDto = OutGetPinDto.from(data);
    return {
      success: true,
      error: null,
      data: [newData],
    };
  }

  // @ApiOperation({ summary: '좋아요 생성' })
  // @Post('/like')
  // @UseGuards(AuthGuard())
  // async setPinLike(
  //   @Body() inSetPinLike: InSetPinLike,
  //   @GetUser() user: User,
  // ): Promise<ResponseDto<boolean>> {
  //   console.log(inSetPinLike);
  //   await this.pinService.setPinLike(inSetPinLike, user._id);

  //   return {
  //     success: true,
  //     error: null,
  //     data: null,
  //   };
  // }
}
