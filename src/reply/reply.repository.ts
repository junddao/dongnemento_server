import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { InCreatePinReplyDto } from './dto/in_create_pin_reply.dto';
import { Reply, ReplyDocument } from './schemas/reply.schema';

export class ReplyRepository {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
  ) {}

  async createReply(
    InCreatePinReplyDto: InCreatePinReplyDto,
    userId: ObjectId,
    userName: string,
  ): Promise<Reply> {
    const newReply = new this.replyModel(InCreatePinReplyDto);
    newReply.userId = userId;
    newReply.userName = userName;
    return newReply.save();
  }

  async find(replyFilterQuery: FilterQuery<Reply>): Promise<Reply[]> {
    return this.replyModel.find(replyFilterQuery);
  }
}
