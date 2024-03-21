import { Question } from './question.interface';

export interface QuestionForm {
  id: string;
  label: string;
  questions: Question[];
}
