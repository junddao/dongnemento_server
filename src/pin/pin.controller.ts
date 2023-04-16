import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFloatPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  ): Promise<ResponseDto<boolean>> {
    await this.pinService.createPin(inCreatePinDto, user.id);
    return {
      success: true,
      error: null,
      data: [true],
    };
  }

  @ApiOperation({ summary: '위치기준 특정 거리 안에 pin들 조회' })
  @ApiResponseDto(OutGetPinsDto)
  @Get('/get/pins')
  @UseGuards(AuthGuard())
  async getPins(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('range', ParseFloatPipe) range: number,
  ): Promise<ResponseDto<OutGetPinsDto>> {
    const inGetPinsDto: InGetPinsDto = {
      lat,
      lng,
      range,
    };

    const data = await this.pinService.getPins(inGetPinsDto);

    // const newData: OutGetPinsDto[] = OutGetPinsDto.from(data);
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: '위치기준 특정 거리 안에 pin들 조회' })
  @ApiResponseDto(OutGetPinsDto)
  @Get('/get/my/pins')
  @UseGuards(AuthGuard())
  async getMyPins(@GetUser() me: User): Promise<ResponseDto<OutGetPinsDto>> {
    const data = await this.pinService.getMyPins(me);

    // const newData: OutGetPinsDto[] = OutGetPinsDto.from(data);
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
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ResponseDto<OutGetPinDto>> {
    const data = await this.pinService.getPin(id, user.id);
    // const newData: OutGetPinDto = OutGetPinDto.from(data);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: 'pin 삭제' })
  @Delete('/delete/:id')
  @UseGuards(AuthGuard())
  async deletePin(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    await this.pinService.deletePin(id);
    return {
      success: true,
      error: null,
      data: [true],
    };
  }
}
