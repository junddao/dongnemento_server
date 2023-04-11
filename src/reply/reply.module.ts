import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';
import { ReplyService } from './reply.service';
import { Reply, ReplySchema } from './schemas/reply.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
  ],
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository],
  exports: [ReplyService],
})
export class ReplyModule {}
