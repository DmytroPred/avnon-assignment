import { Injectable, signal } from '@angular/core';
import { FormAnswers } from '../../../models/form-answers.interface';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  answers = signal<FormAnswers[]>([]);

  updateAnswers(id: string, title: string, data: any) {
    this.answers.update((value: any[]) => {
      const copy = [...value];
      const updatedAnswerIndex = copy.findIndex((item) => item.id === id);

      if (updatedAnswerIndex >= 0) {
        copy[updatedAnswerIndex] = { id, title, answers: data };
      } else {
        copy.push({
          id,
          title,
          answers: data,
        });
      }
      return copy;
    });
  }
}
