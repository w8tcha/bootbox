export default interface Buttons {
  [name: string]: Button;
}

export interface Button {
  id?: string;
  label: string;
  className: string;
  disabled?: boolean;
  callback?: (() => void) | null;
}