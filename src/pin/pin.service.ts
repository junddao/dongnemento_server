import { InGetPinsDto } from './dto/in_get_pins.dto';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { Injectable } from '@nestjs/common';
import { PinRepository } from './pin.repository';
import { Pin } from './schemas/pin.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class PinService {
  constructor(private readonly pinRepository: PinRepository) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: ObjectId,
  ): Promise<Pin> {
    return this.pinRepository.createPin(InCreatePinDto, userId);
  }

  async getPins(inGetPinsDto: InGetPinsDto, userId: ObjectId): Promise<Pin[]> {
    return this.pinRepository.find({
      lat: {
        $gt: inGetPinsDto.lat - inGetPinsDto.range / 91000,
        $lt: inGetPinsDto.lat + inGetPinsDto.range / 91000,
      },
      lng: {
        $gt: inGetPinsDto.lng - inGetPinsDto.range / 111000,
        $lt: inGetPinsDto.lng + inGetPinsDto.range / 111000,
      },
      userId: userId,
    });
  }

  async getPin(_id: string): Promise<Pin> {
    return this.pinRepository.findOne({ _id });
  }
}
