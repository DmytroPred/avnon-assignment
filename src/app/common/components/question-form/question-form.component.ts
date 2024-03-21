import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
})
export class QuestionFormComponent {
  @Input() formTitle: string = '';

  questionForm = new FormBuilder().nonNullable.group({
    question: ['', [Validators.required, Validators.maxLength(60)]],
    required: [false],
  });

  constructor(private questionService: QuestionsService) {}

  get question() {
    return this.questionForm.get('question');
  }

  onSubmit(): void {
    const formData = this.questionForm.getRawValue();

    this.questionService.updateQuestion(
      {
        label: formData.question,
        required: formData.required,
        controlType: 'textarea',
        key:
          this.questionService.selectedForm()?.questions.length.toString() ||
          '0',
      },
      this.formTitle
    );

    this.questionForm.reset();
  }
}
