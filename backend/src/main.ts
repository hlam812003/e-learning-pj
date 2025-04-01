import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  const port = process.env.PORT || 10000;
  app.enableCors();
  await app.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
