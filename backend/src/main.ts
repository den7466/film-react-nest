import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
// import { DevLogger } from './loggers/devLogger.service';
// import { JsonLogger } from './loggers/jsonLogger.service';
// import { TskvLogger } from './loggers/tskvLogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const loggerType = process.env.LOGGER || 'dev';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  // switch (loggerType) {
  //   case 'dev':
  //     app.useLogger(new DevLogger());
  //     break;
  //   case 'json':
  //     app.useLogger(new JsonLogger());
  //     break;
  //   case 'tskv':
  //     app.useLogger(new TskvLogger());
  //     break;
  // }
  await app.listen(3000);
}
bootstrap();
