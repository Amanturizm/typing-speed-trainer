export interface ErrorsInText {
  incorrect: number;
  extra: number;
  missed: number;
}

export interface Result {
  typedText: string[];
  wordPerMinutes: number | null;
  errorsInText: ErrorsInText;
}
