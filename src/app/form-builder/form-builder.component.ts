import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from '../common/components/form-modal/form-modal.component';
import { QuestionsService } from '../common/services/questions.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
})
export class FormBuilderComponent {
  constructor(
    private dialog: MatDialog,
    public questionsService: QuestionsService
  ) {}

  openDialog(id?: string): void {
    this.questionsService.selectedQuestionFormIndex.set(
      id ? +id : this.questionsService.questionForms().length
    );

    this.dialog.open(FormModalComponent, {
      width: '400px',
    });
  }
}
