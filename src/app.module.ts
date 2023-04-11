import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, SchemaOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HateModule } from './hate/hate.module';
import { LikeModule } from './like/like.module';
import { LoggerMiddleware } from './logger.middleware';
import { PinModule } from './pin/pin.module';
import { ReplyModule } from './reply/reply.module';
import { ReportModule } from './report/report.module';
import { UploadsModule } from './uploads/uploads.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'prod' ? './env/prod.env' : './env/dev.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionFactory: (connection) => {
          connection.plugin((schema) => {
            // Define SchemaOptions to transform _id to id
            const schemaOptions: SchemaOptions = {
              toJSON: {
                virtuals: true,
                versionKey: false,
                transform: function (doc, ret) {
                  ret.id = ret._id;
                  delete ret._id;
                },
              },
              toObject: {
                virtuals: true,
                versionKey: false,
                transform: function (doc, ret) {
                  ret.id = ret._id;
                  delete ret._id;
                },
              },
            };

            schema.set('toJSON', schemaOptions.toJSON);
            schema.set('toObject', schemaOptions.toObject);
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    UploadsModule,
    PinModule,
    ReplyModule,
    LikeModule,
    HateModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/user');
  }
}
