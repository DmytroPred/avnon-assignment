import { FormType } from './form-type';
import { Option } from './option.interface';

export interface Question {
  label: string;
  key: string;
  required: boolean;
  controlType: FormType;
  options?: Option[];
}
