import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { InCreateLikeDto } from './dto/inCreateLike.dto';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}
  async createPinLike(
    inCreateLikeDto: InCreateLikeDto,
    userId: ObjectId,
  ): Promise<void> {
    const newPinLike = new this.likeModel(inCreateLikeDto);
    newPinLike.userId = userId;
    newPinLike.save();
  }

  async getLikeCount(pinId: ObjectId): Promise<number> {
    const pins = await this.likeModel.find({ pinId: pinId });
    const pinCount = pins.length;
    return pinCount;
  }
}
