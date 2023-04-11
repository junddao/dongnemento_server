import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { InCreateHateDto } from './dto/inCreateHate.dto';
import { Hate, HateDocument } from './schemas/hate.schema';

@Injectable()
export class HateService {
  constructor(@InjectModel(Hate.name) private hateModel: Model<HateDocument>) {}

  async setPinHate(
    inCreateHateDto: InCreateHateDto,
    userId: ObjectId,
  ): Promise<void> {
    const exist = await this.hateModel.exists({
      pinId: inCreateHateDto.pinId,
      userId: userId,
    });

    if (exist) {
      await this.hateModel.deleteOne({
        pinId: inCreateHateDto.pinId,
        userId: userId,
      });
    } else {
      const newPinHate = new this.hateModel(inCreateHateDto);
      newPinHate.userId = userId;
      newPinHate.save();
    }
  }

  async getHateCount(pinId: ObjectId): Promise<number> {
    const pins = await this.hateModel.find({ pinId: pinId });

    const pinCount = pins.length;
    return pinCount;
  }

  async isHatedByMe(pinId: ObjectId, userId: ObjectId): Promise<boolean> {
    const exist = await this.hateModel.exists({
      pinId: pinId,
      userId: userId,
    });
    if (exist) {
      return true;
    } else return false;
  }
}
