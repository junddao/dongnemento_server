import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { InCreateLikeDto } from './dto/inCreateLike.dto';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}
  async setPinLike(
    inCreateLikeDto: InCreateLikeDto,
    userId: ObjectId,
  ): Promise<void> {
    const exist = await this.likeModel.exists({
      pinId: inCreateLikeDto.pinId,
      userId: userId,
    });

    if (exist) {
      await this.likeModel.deleteOne({
        pinId: inCreateLikeDto.pinId,
        userId: userId,
      });
    } else {
      const newPinLike = new this.likeModel(inCreateLikeDto);
      newPinLike.userId = userId;
      newPinLike.save();
    }
  }

  async getLikeCount(pinId: ObjectId): Promise<number> {
    const pins = await this.likeModel.find({ pinId: pinId });
    console.log(pins);
    const pinCount = pins.length;
    return pinCount;
  }

  async isLikedByMe(pinId: ObjectId, userId: ObjectId): Promise<boolean> {
    const exist = await this.likeModel.exists({
      pinId: pinId,
      userId: userId,
    });
    if (exist) {
      return true;
    } else return false;
  }
}
