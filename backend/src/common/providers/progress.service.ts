import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProgressInput } from '../DTO/progress/progress.input';
import { ProgressStatus } from '@prisma/client';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateProgress(courseId: string, completedLessons: number,totalLesson: number) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { _count: { select: { lessons: true } } },
    });

    if (!course) throw new NotFoundException('Course not found');

    const totalLessons = totalLesson;
    const percentage = totalLessons > 0 ? Math.min(100, (completedLessons / totalLessons) * 100) : 0;

    return {
      totalLessons,
      percentage,
      status: percentage === 100 ? ProgressStatus.COMPLETED : ProgressStatus.IN_PROGRESS,
    };
  }

  async updateProgress(input: UpdateProgressInput) {
    return this.prisma.$transaction(async (tx) => {
      const progress = await tx.progress.findUnique({
        where: { id: input.progressId },
      });

      if (!progress) throw new NotFoundException('Progress not found');

      const { totalLessons, percentage, status } = await this.calculateProgress(progress.courseId, input.completedLessons, input.totalLessons);

      return tx.progress.update({
        where: { id: input.progressId },
        data: {
          completedLessons: input.completedLessons,
          totalLessons: input.totalLessons,
          percentage,
          status,
        },
      });
    });
  }

  async getProgress(progressId: string) {
    const progress = await this.prisma.progress.findUnique({
      where: { id: progressId },
      include: {
        course: {
          select: {
            courseName: true,
            _count: { select: { lessons: true } },
          },
        },
      },
    });

    if (!progress) throw new NotFoundException('Progress not found');

    return {
      ...progress,
      courseName: progress.course.courseName,
      totalLessons: progress.course._count.lessons,
    };
  }
}
