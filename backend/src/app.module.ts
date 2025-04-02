import { Module } from '@nestjs/common';
import { CourseModule } from './modules/course.module';
import { LessonModule } from './modules/lesson.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { EnrollmentModule } from './modules/enrollment.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Thêm driver vào đây
      autoSchemaFile: 'schema.gql',
      debug: true, // Bật debug mode
      introspection: true,
      playground: true,
      csrfPrevention: false, // Tắt CSRF protection
    }),
    CourseModule,
    LessonModule,
    UserModule,
    AuthModule,
    EnrollmentModule,
    ProgressModule,
  ],
})
export class AppModule {}
