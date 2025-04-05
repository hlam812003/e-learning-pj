// src/service/progress.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProgressInput } from '../DTO/progress/progress.input';
import { ProgressStatus } from '@prisma/client';
import { ProgressDAO } from '../DAO/progress.dao';

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly progressDAO: ProgressDAO,
  ) {}

  // Tính toán tiến độ dựa trên số bài học đã hoàn thành và tổng số bài học lấy từ DB
  async calculateProgress(courseId: string, completedLessons: number, input: UpdateProgressInput) {
    const course = await this.progressDAO.findCourseById(courseId);
    const progress = await this.progressDAO.findProgressById(input.progressId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if(!progress) {
      throw new NotFoundException('Progress not found');
    }
    const totalLessons = progress.totalLessons || course._count.lessons;
    if (completedLessons > totalLessons) {
      throw new Error('Completed lessons cannot exceed total lessons');
    }
    // Tính toán tỷ lệ phần trăm hoàn thành
    // Sử dụng Math.min để đảm bảo tỷ lệ phần trăm không vượt quá 100%
    const percentage = totalLessons > 0 ? Math.min(100, (completedLessons / totalLessons) * 100) : 0;
    return {
      totalLessons,
      percentage,
      status: percentage === 100 ? ProgressStatus.COMPLETED : ProgressStatus.IN_PROGRESS,
    };
  }

  // Cập nhật tiến độ của progress, sử dụng transaction để đảm bảo tính nhất quán
  async updateProgress(input: UpdateProgressInput) {
    return this.prisma.$transaction(async (tx) => {
      // Lấy thông tin progress (bao gồm thông tin khóa học)
      const progress = await this.progressDAO.findProgressById(input.progressId);
      if (!progress) throw new NotFoundException('Progress not found');

      // Tính lại tiến độ dựa trên số bài học đã hoàn thành
      const { totalLessons, percentage, status } = await this.calculateProgress(progress.courseId, input.completedLessons, input);

      const updatedData = {
        completedLessons: input.completedLessons,
        percentage,
        status,
      };

      return this.progressDAO.updateProgress(tx, input.progressId, updatedData);
    });
  }

  // Lấy thông tin progress để hiển thị
  async getProgress(progressId: string) {
    const progress = await this.progressDAO.findProgress(progressId);
    if (!progress) throw new NotFoundException('Progress not found');

    return {
      ...progress,
      courseName: progress.course.courseName,
      totalLessons: progress.course._count.lessons,
    };
  }
}
