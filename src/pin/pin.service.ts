import { InCreateLikeDto } from './../like/dto/inCreateLike.dto';
import { LikeService } from './../like/like.service';
import { InGetPinsDto } from './dto/in_get_pins.dto';
import { InCreatePinDto } from './dto/in_create_pin.dto';
import { Injectable } from '@nestjs/common';
import { PinRepository } from './pin.repository';
import { Pin } from './schemas/pin.schema';
import mongoose, { ObjectId } from 'mongoose';
import { InSetPinLike } from './dto/in_set_pin_like.dto';

@Injectable()
export class PinService {
  constructor(
    private readonly pinRepository: PinRepository,
    private readonly likeService: LikeService,
  ) {}

  async createPin(
    InCreatePinDto: InCreatePinDto,
    userId: ObjectId,
  ): Promise<Pin> {
    return this.pinRepository.createPin(InCreatePinDto, userId);
  }

  async getPins(inGetPinsDto: InGetPinsDto, userId: ObjectId): Promise<Pin[]> {
    return this.pinRepository.find({
      lat: {
        $gt: inGetPinsDto.lat - inGetPinsDto.range / 90000,
        $lt: inGetPinsDto.lat + inGetPinsDto.range / 90000,
      },
      lng: {
        $gt: inGetPinsDto.lng - inGetPinsDto.range / 111000,
        $lt: inGetPinsDto.lng + inGetPinsDto.range / 111000,
      },
      userId: userId,
    });
  }

  async getPin(_id: ObjectId): Promise<Pin> {
    // const id = new mongoose.Schema.Types.ObjectId(_id);
    const count = await this.likeService.getLikeCount(_id);
    const result = await this.pinRepository.findOne({ _id });
    result.likeCount = count;
    return result;
  }

  async setPinLike(
    inSetPinLike: InSetPinLike,
    userId: ObjectId,
  ): Promise<void> {
    const inCreateLikeDto: InCreateLikeDto = {
      pinId: inSetPinLike._id.toString(),
    };
    this.likeService.createPinLike(inCreateLikeDto, userId);
  }
}
