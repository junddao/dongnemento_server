import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto, ResponseDto } from 'src/common/dto/response.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { InCreatePinReplyDto } from './dto/in_create_pin_reply.dto';
import { OutGetPinRepliesDto } from './dto/out_get_pin_replies.dto';
import { ReplyService } from './reply.service';

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
    await this.replyService.createReply(inCreateReplyDto, user.id, user.name);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @ApiOperation({ summary: 'pin 조회' })
  @ApiResponseDto(OutGetPinRepliesDto)
  @Get('/get/replies/:id')
  @UseGuards(AuthGuard())
  async getPinReplies(
    @Param('id') pinId: string,
  ): Promise<ResponseDto<OutGetPinRepliesDto>> {
    const data = await this.replyService.getPinReplies(pinId);
    return {
      success: true,
      error: null,
      data: data,
    };
  }
}
