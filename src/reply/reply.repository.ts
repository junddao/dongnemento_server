import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { InCreatePinReplyDto } from './dto/in_create_pin_reply.dto';
import { Reply, ReplyDocument } from './schemas/reply.schema';

export class ReplyRepository {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
  ) {}

  async createReply(
    InCreatePinReplyDto: InCreatePinReplyDto,
    userId: ObjectId,
  ): Promise<Reply> {
    const newReply = new this.replyModel(InCreatePinReplyDto);
    newReply.userId = userId;
    return newReply.save();
  }
}
