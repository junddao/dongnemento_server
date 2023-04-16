import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { Pin, PinDocument } from './schemas/pin.schema';

@Injectable()
export class PinRepository {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: string,
  ): Promise<Pin> {
    const newPin = new this.pinModel(InCreatePinDto);
    newPin.userId = userId;
    return newPin.save();
  }
  async find(pinFilterQuery: FilterQuery<Pin>): Promise<PinDocument[]> {
    console.log(pinFilterQuery);
    const pins = await this.pinModel
      .find(pinFilterQuery)
      .populate('authorUser')
      .exec();

    console.log(pins);

    return pins;
  }

  async findById(id: string): Promise<PinDocument> {
    const selectedPin = await this.pinModel
      .findById(id)
      .populate('authorUser')
      .exec();

    return selectedPin;

    // return selectedPin;
  }

  async delete(pinFilterQuery: FilterQuery<Pin>): Promise<void> {
    try {
      const result = await this.pinModel.deleteOne(pinFilterQuery);
      if (result.deletedCount === 0) {
        throw new NotFoundException(`can't find id`);
      }
    } catch (e) {
      throw new NotFoundException(`can't delete this id`);
    }
  }
}
