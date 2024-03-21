import { Injectable, computed, signal } from '@angular/core';
import { QuestionForm } from '../../../models/question-form.interface';
import { Question } from '../../../models/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questionForms = signal<QuestionForm[]>([]);
  selectedQuestionFormIndex = signal<number>(0);
  selectedForm = computed(
    () => this.questionForms()[this.selectedQuestionFormIndex()]
  );

  updateQuestion(data: Question, title: string): void {
    this.questionForms.update((value: QuestionForm[]) => {
      const copy = [...value];
      const selectedForm = copy[this.selectedQuestionFormIndex()];

      if (selectedForm) {
        selectedForm.questions.push(data);
        selectedForm.label = title;
      } else {
        copy.push({
          id: copy.length.toString(),
          label: title,
          questions: [data],
        });
      }

      return copy;
    });
  }
}
