import { ReplyRepository } from './reply.repository';
import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Reply, ReplySchema } from './schemas/reply.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
  ],
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository],
})
export class ReplyModule {}
