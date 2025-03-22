import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Lesson } from '@prisma/client';

@Injectable()
export class LessonDAO {
  constructor(private readonly prisma: PrismaService) {}

  async createLesson(data: {
    lessonName: string;
    abstract?: string | null;
    courseId: string;
  }): Promise<Lesson> {
    return this.prisma.lesson.create({ data });
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async getAllLessons(): Promise<Lesson[]> {
    return this.prisma.lesson.findMany();
  }

  async updateLesson(
    id: string,
    data: { lessonName?: string; abstract?: string | null },
  ): Promise<Lesson> {
    return this.prisma.lesson.update({ where: { id }, data });
  }

  async deleteLesson(id: string): Promise<Lesson> {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
