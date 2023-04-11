import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto, ResponseDto } from '../common/dto/response.dto';
import { InBlockDto } from './dto/in_block.dto';
import { InGetTokenDto } from './dto/in_get_token.dto';
import { InSignInDto } from './dto/in_sign_in.dto';
import { InSignInAppleDto } from './dto/in_sign_in_apple.dto';
import { InSignInKakaoDto } from './dto/in_sign_in_kakao.dto';
import { InSignUpDto } from './dto/in_sign_up.dto';
import { InUpdateUserDto } from './dto/in_update_user.dto';
import { OutGetMeDto } from './dto/out_get_me.dto';
import { OutGetUserDto } from './dto/out_get_user.dto';
import { OutSignInDto } from './dto/out_sign_in.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@ApiExtraModels(ResponseDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponseDto(OutGetMeDto)
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<ResponseDto<OutGetMeDto>> {
    const data = await this.userService.getMe(req.user);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '전체 유저 목록 조회' })
  @Get('/all')
  @ApiResponseDto(OutGetUserDto)
  @UseGuards(AuthGuard())
  async getUsers(): Promise<ResponseDto<OutGetUserDto[]>> {
    const data = await this.userService.getUsers();
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: 'id로 유저 목록 조회' })
  @ApiResponseDto(OutGetUserDto)
  @Get('/get/:id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: string): Promise<ResponseDto<OutGetUserDto>> {
    const data = await this.userService.getUser(id);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponseDto(String)
  @Post('/signup')
  async signUp(
    @Body() requestSignUpDto: InSignUpDto,
  ): Promise<ResponseDto<null>> {
    await this.userService.signUp(requestSignUpDto);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiResponseDto(String)
  @Get('/drop')
  @UseGuards(AuthGuard())
  async Drop(@Req() req): Promise<ResponseDto<null>> {
    await this.userService.drop(req.user);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponseDto(OutSignInDto)
  @Post('/signin')
  async signIn(
    @Body() inSingInDto: InSignInDto,
  ): Promise<ResponseDto<OutSignInDto>> {
    const data = await this.userService.signIn(inSingInDto);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponseDto(InGetTokenDto)
  @Post('/get/token')
  async getToken(
    @Body() inGetTokenDto: InGetTokenDto,
  ): Promise<ResponseDto<OutSignInDto>> {
    const data = await this.userService.getToken(inGetTokenDto);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '유저 정보 업데이트' })
  @ApiResponseDto(OutGetUserDto)
  @Post('/update')
  @UseGuards(AuthGuard())
  async updateUser(
    @Body() inUpdateUserDto: InUpdateUserDto,
  ): Promise<ResponseDto<OutGetUserDto>> {
    const data = await this.userService.updateUser(inUpdateUserDto);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '유저 정보 업데이트' })
  @ApiResponseDto(OutGetUserDto)
  @Put('/block')
  @UseGuards(AuthGuard())
  async blockUser(
    @Req() req,
    @Body() inBlockDto: InBlockDto,
  ): Promise<ResponseDto<OutGetUserDto>> {
    const data = await this.userService.blockUser(inBlockDto, req.user);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '카카오 로그인' })
  @ApiResponseDto(OutSignInDto)
  @Post('/kakao')
  async signInKakao(
    @Body() inSignInKakao: InSignInKakaoDto,
  ): Promise<ResponseDto<OutSignInDto>> {
    const data = await this.userService.signInKakao(inSignInKakao);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '애플 로그인' })
  @ApiResponseDto(OutSignInDto)
  @Post('/apple')
  async signInApple(
    @Body() inSignInApple: InSignInAppleDto,
  ): Promise<ResponseDto<OutSignInDto>> {
    const data = await this.userService.signInApple(inSignInApple);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }
}
