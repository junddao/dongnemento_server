import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InCreatePinReplyDto } from './dto/in_create_pin_reply.dto';
import { ReplyRepository } from './reply.repository';
import { Reply } from './schemas/reply.schema';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}

  async createReply(
    InCreatePinReplyDto: InCreatePinReplyDto,
    userId: string,
    userName: string,
  ): Promise<Reply> {
    return this.replyRepository.createReply(
      InCreatePinReplyDto,
      userId,
      userName,
    );
  }

  async getPinReplies(pinId: string): Promise<Reply[]> {
    const newPinId = new mongoose.Types.ObjectId(pinId);
    console.log(pinId);
    console.log(newPinId);
    const replys = await this.replyRepository.find({
      pinId: newPinId,
    });
    console.log(replys);
    return replys;
  }
}
