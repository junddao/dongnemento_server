import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('NODE_SERVER_PORT');
  if (process.env.NODE_ENV === 'prod') {
    // 운영 환경 설정
    app.setGlobalPrefix('prod');
  } else {
    // 개발 환경 설정
    app.enableCors();
    app.setGlobalPrefix('dev');
  }

  if (process.env.NODE_ENV === 'prod') {
    // 운영 환경 설정
    const prodOptions = new DocumentBuilder()
      .setTitle('My API (prod)')
      .setDescription('API description (prod)')
      .setVersion('1.0')
      .build();

    const prodDocument = SwaggerModule.createDocument(app, prodOptions);
    SwaggerModule.setup('/prod/docs', app, prodDocument);
  } else {
    // 개발 환경 설정
    const devOptions = new DocumentBuilder()
      .setTitle('My API (dev)')
      .setDescription('API description (dev)')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        name: 'JWT',
        in: 'header',
      })
      .build();
    const devDocument = SwaggerModule.createDocument(app, devOptions);
    SwaggerModule.setup('/dev/docs', app, devDocument);
  }

  console.log(port);
  await app.listen(port);
}
bootstrap();
