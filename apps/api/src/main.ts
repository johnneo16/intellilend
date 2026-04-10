import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create({
    module: class AppModule {}
  });
  
  app.enableCors();
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 API is running on: http://localhost:${port}`);
}

bootstrap();
