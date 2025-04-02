import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentInput } from '../DTO/enrollment/enrollment.input';
import { EnrollmentResponse } from '../DTO/enrollment/enrollment.response';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async enrollUserToCourse(input: CreateEnrollmentInput): Promise<EnrollmentResponse> {
    const { userId, courseId } = input;

    // Kiểm tra xem user và course có tồn tại không trong cùng một truy vấn
    const [user, course] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.course.findUnique({ where: { id: courseId } }),
    ]);

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    if (!course) throw new NotFoundException(`Course with ID ${courseId} not found`);

    // Kiểm tra xem user đã đăng ký chưa
    const existingEnrollment = await this.prisma.enrollment.findFirst({
      where: { userId, courseId },
    });
    if (existingEnrollment) throw new ConflictException('User already enrolled in this course');

    // Transaction để đảm bảo đồng bộ hóa giữa Enrollment và Progress
    return this.prisma.$transaction(async (prisma) => {
      const enrollment = await prisma.enrollment.create({
        data: { userId, courseId },
      });

      await prisma.progress.create({
        data: {
          userId,
          courseId,
          percentage: 0,
        },
      });

      return enrollment;
    });
  }

  async getUserEnrollments(userId: string): Promise<EnrollmentResponse[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });

    if (!enrollments.length) {
      throw new NotFoundException(`No enrollments found for user ID: ${userId}`);
    }

    return enrollments.map((enrollment) => ({
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      enrolledAt: enrollment.enrolledAt,
    }));
  }
}
