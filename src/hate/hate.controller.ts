import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { InCreateHateDto } from './dto/inCreateHate.dto';
import { HateService } from './hate.service';

@ApiTags('hate')
@Controller('hate')
export class HateController {
  constructor(private readonly hateService: HateService) {}

  @ApiOperation({ summary: 'Pin hate 생성' })
  @Post('/pin')
  @UseGuards(AuthGuard())
  async setPinHate(
    @Body() inCreateHateDto: InCreateHateDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.hateService.setPinHate(inCreateHateDto, user.id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }
}
