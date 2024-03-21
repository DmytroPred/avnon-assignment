import { Component, effect, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { QuestionFormService } from '../../services/question-form.service';
import { AnswersService } from '../../services/answers.service';
import { FormType } from '../../../../models/form-type';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  form!: FormGroup;
  title = new FormControl(this.questionService.selectedForm()?.label || '', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(30)],
  });

  isQuestionFormBuilder = signal(false);
  questionType = signal<FormType | ''>('');

  constructor(
    public questionService: QuestionsService,
    private answersService: AnswersService,
    private qcs: QuestionFormService
  ) {
    effect(() => {
      if (
        this.questionService.selectedForm() &&
        this.questionService.questionForms()
      ) {
        this.form = this.qcs.toFormGroup(
          this.questionService.selectedForm()?.questions
        );
      }
    });
  }

  toggleShowQuestionForm(): void {
    this.isQuestionFormBuilder.update((value) => !value);

    if (this.isQuestionFormBuilder()) {
      this.questionType.set('textarea');
    } else {
      this.questionType.set('');
    }
  }

  setQuestionType(type: FormType | ''): void {
    this.questionType.set(type);
  }

  onSubmit() {
    const selectedForm = this.questionService.selectedForm();
    const answers = [];

    for (const [key, value] of Object.entries(this.form.getRawValue())) {
      const question = selectedForm.questions.find((item) => item.key === key);

      answers.push({
        label: question?.label,
        type: question?.controlType,
        answer:
          question?.controlType === 'textarea'
            ? value
            : question?.options?.map((item, index) =>
                (value as boolean[])[index] === true ? item.title : ''
              ),
      });
    }

    this.answersService.updateAnswers(
      selectedForm.id,
      selectedForm.label,
      answers
    );
  }
}
