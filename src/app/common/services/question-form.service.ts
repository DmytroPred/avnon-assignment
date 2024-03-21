import { Injectable } from '@angular/core';
import { Question } from '../../../models/question.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { atLeastOneTrueValidator } from '../utils/one-true-validator';

@Injectable({
  providedIn: 'root',
})
export class QuestionFormService {
  toFormGroup(questions: Question[]) {
    const group: { [key: string]: any } = {};

    questions.forEach((question: Question) => {
      if (question.controlType === 'checkbox') {
        group[question.key] = new FormArray([], {
          validators: question.required ? atLeastOneTrueValidator : null,
        });

        question.options?.map(() => {
          group[question.key].push(new FormControl(false));
        });
      }

      if (question.controlType === 'textarea') {
        group[question.key] = question.required
          ? new FormControl('', Validators.required)
          : new FormControl('');
      }
    });

    return new FormGroup(group);
  }
}
