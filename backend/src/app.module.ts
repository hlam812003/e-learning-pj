import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    ConfigModule.forRoot(),
    ApiModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {}
