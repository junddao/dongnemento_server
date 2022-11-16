import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UserModule } from 'src/user/user.module';
import { HateController } from './hate.controller';
import { HateService } from './hate.service';
import { Hate, HateSchema } from './schemas/hate.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Hate.name, schema: HateSchema }]),
  ],
  controllers: [HateController],
  providers: [HateService],
  exports: [HateService],
})
export class HateModule {}
