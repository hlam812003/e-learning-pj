import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './modules/course.module';
import { LessonModule } from './modules/lesson.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Thêm driver vào đây
      autoSchemaFile: true,
      playground: true,
      csrfPrevention: false, // Tắt CSRF protection
    }),
    CourseModule,
    LessonModule,
  ],
})
export class AppModule {}
