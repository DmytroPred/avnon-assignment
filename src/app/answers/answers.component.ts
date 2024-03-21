import { Component } from '@angular/core';
import { AnswersService } from '../common/services/answers.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss',
})
export class AnswersComponent {
  constructor(public answersService: AnswersService) {}
}
