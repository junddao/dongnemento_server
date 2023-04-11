import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { InCreatePinReplyDto } from './dto/in_create_pin_reply.dto';
import { ReplyRepository } from './reply.repository';
import { Reply } from './schemas/reply.schema';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}

  async createReply(
    InCreatePinReplyDto: InCreatePinReplyDto,
    userId: ObjectId,
    userName: string,
  ): Promise<Reply> {
    return this.replyRepository.createReply(
      InCreatePinReplyDto,
      userId,
      userName,
    );
  }

  async getPinReplies(pinId: ObjectId): Promise<Reply[]> {
    return this.replyRepository.find({ pinId: pinId });
  }
}
