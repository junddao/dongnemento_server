import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { OutGetPinDto } from './dto/out_get_pin.dto';
import { Pin, PinDocument } from './schemas/pin.schema';

@Injectable()
export class PinRepository {
  constructor(@InjectModel(Pin.name) private pinModel: Model<PinDocument>) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: ObjectId,
  ): Promise<Pin> {
    const newPin = new this.pinModel(InCreatePinDto);
    newPin.userId = userId;
    return newPin.save();
  }
  async find(pinFilterQuery: FilterQuery<Pin>): Promise<Pin[]> {
    return this.pinModel.find(pinFilterQuery);
  }

  async findOne(pinFilterQuery: FilterQuery<Pin>): Promise<OutGetPinDto> {
    const selectedPin = await this.pinModel
      .findOne(pinFilterQuery)
      .populate('authorUser')
      .exec();
    console.log(selectedPin.authorUser.name);
    console.log(selectedPin);
    return OutGetPinDto.from(selectedPin);

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
