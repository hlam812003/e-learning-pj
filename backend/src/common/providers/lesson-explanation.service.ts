/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { LessonExplanationDAO } from '../DAO/lesson-explanation.dao';
import {
  CreateLessonExplanationInput,
  UpdateLessonExplanationInput,
} from '../DTO/lesson-explanation/lesson-explanation.input';
import { LessonExplanationResponse } from '../DTO/lesson-explanation/lesson-explanation.response';
import { plainToClass } from 'class-transformer';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface PDFRewriteResponse {
  result: string;
}

@Injectable()
export class LessonExplanationService {
  constructor(
    private readonly lessonExplanationDAO: LessonExplanationDAO,
    private readonly httpService: HttpService,
  ) {}

  async createLessonExplanation(
    input: CreateLessonExplanationInput,
  ): Promise<LessonExplanationResponse> {
    try {
      // Call the PDF rewrite API
      const response = await firstValueFrom(
        this.httpService.post<PDFRewriteResponse>(
          'http://localhost:8000/rewrite-pdf-emotion',
          {
            emotion: input.emotion,
            course_id: input.courseId,
            lesson_id: input.lessonId,
          },
        ),
      );

      // Create explanation with the API response
      const explanation =
        await this.lessonExplanationDAO.createLessonExplanation({
          content: response.data.result,
          emotion: input.emotion,
          lessonId: input.lessonId,
          userId: input.userId,
        });

      return plainToClass(LessonExplanationResponse, explanation);
    } catch (error) {
      console.error('Error getting PDF rewrite:', error);
      throw new Error('Failed to generate lesson explanation');
    }
  }

  async getLessonExplanationById(
    id: string,
  ): Promise<LessonExplanationResponse | null> {
    const explanation =
      await this.lessonExplanationDAO.getLessonExplanationById(id);
    if (!explanation) return null;
    return plainToClass(LessonExplanationResponse, explanation);
  }

  async getLessonExplanationByLessonAndUser(
    lessonId: string,
    userId: string,
  ): Promise<LessonExplanationResponse | null> {
    const explanation =
      await this.lessonExplanationDAO.getLessonExplanationByLessonAndUser(
        lessonId,
        userId,
      );
    if (!explanation) return null;
    return plainToClass(LessonExplanationResponse, explanation);
  }

  async updateLessonExplanation(
    input: UpdateLessonExplanationInput,
  ): Promise<LessonExplanationResponse> {
    const explanation = await this.lessonExplanationDAO.updateLessonExplanation(
      input.id,
      { content: input.content },
    );
    return plainToClass(LessonExplanationResponse, explanation);
  }

  async deleteLessonExplanation(
    id: string,
  ): Promise<LessonExplanationResponse> {
    const explanation =
      await this.lessonExplanationDAO.deleteLessonExplanation(id);
    return plainToClass(LessonExplanationResponse, explanation);
  }
}
