import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { Option } from '../../../../models/option.interface';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrl: './checkbox-form.component.scss',
})
export class CheckboxFormComponent {
  @Input() formTitle: string = '';

  form = this.fb.nonNullable.group({
    question: ['', [Validators.required, Validators.maxLength(60)]],
    options: this.fb.array([]),
    required: [false],
  });

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService
  ) {}

  get options(): FormArray<any> {
    return this.form.controls['options'] as FormArray;
  }

  addOption(): void {
    const checkbox = this.fb.group({
      title: ['', Validators.required],
    });

    this.options.push(checkbox);
  }

  deleteOption(optionIndex: number): void {
    this.options.removeAt(optionIndex);
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();

    this.questionService.updateQuestion(
      {
        label: formData.question,
        required: formData.required,
        controlType: 'checkbox',
        key:
          this.questionService.selectedForm()?.questions.length.toString() ||
          '0',
        options: formData.options as Option[],
      },
      this.formTitle
    );
  }
}
