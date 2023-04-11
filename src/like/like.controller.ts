import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { InCreateLikeDto } from './dto/inCreateLike.dto';
import { LikeService } from './like.service';
@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: 'Pin like 생성' })
  @Post('/pin')
  @UseGuards(AuthGuard())
  async setPinLike(
    @Body() inCreateLikeDto: InCreateLikeDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.likeService.setPinLike(inCreateLikeDto, user.id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
