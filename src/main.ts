import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.enableCors({ origin: '*', optionsSuccessStatus: 204 });
	const config = new DocumentBuilder().setTitle('nest-mongo-lessons').setDescription('The API description').setVersion('1.0.0').addTag('VSUA').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/docs', app, document);

	const port: string = process.env.PORT || '3001';
	await app.listen(port, () => console.log(`http://localhost:${port}`)); // eslint-disable-line no-console
}
bootstrap();
