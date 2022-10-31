import { InGetPinsDto } from './dto/in_get_pins.dto';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
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
}
