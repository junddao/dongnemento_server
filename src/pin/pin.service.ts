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
}
