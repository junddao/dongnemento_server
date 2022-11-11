import { InCreateLikeDto } from './dto/inCreateLike.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: 'Pin like 생성' })
  @Post('/pin')
  @UseGuards(AuthGuard())
  async createPinLike(
    @Body() inCreateLikeDto: InCreateLikeDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.likeService.createPinLike(inCreateLikeDto, user._id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
