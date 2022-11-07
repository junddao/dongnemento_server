import { ReplyService } from './reply.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InCreatePinReplyDto } from './dto/in_create_pin_reply.dto';
import { User } from 'src/user/schemas/user.schema';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('reply')
@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @ApiOperation({ summary: 'reply 생성' })
  @Post('/create')
  @UseGuards(AuthGuard())
  async createReply(
    @Body() inCreateReplyDto: InCreatePinReplyDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.replyService.createReply(inCreateReplyDto, user._id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
