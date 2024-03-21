import { FormType } from './form-type';

export interface FormAnswers {
  id: string;
  title: string;
  answers: Answer[];
}

interface Answer {
  label: string;
  type: FormType;
  answer: string;
}
