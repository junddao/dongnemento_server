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
  ): Promise<Like> {
    const newPinLike = new this.likeModel(inCreateLikeDto);
    newPinLike.userId = userId;
    return newPinLike.save();
  }
}
