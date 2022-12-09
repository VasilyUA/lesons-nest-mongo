import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port: string = process.env.PORT || '3001';
  await app.listen(port, () => console.log(`http://localhost:${port}`)); // eslint-disable-line no-console
}
bootstrap();
