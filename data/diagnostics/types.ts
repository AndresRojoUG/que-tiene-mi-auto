export type DiagnosticOption = {
  id: string;
  label: string;
  nextQuestion?: string;
  result?: string;
};

export type DiagnosticQuestion = {
  id: string;
  question: string;
  explanation?: string;
  options: DiagnosticOption[];
};

export type DiagnosticDefinition = {
  problemId: string;
  startQuestionId: string;
  questions: DiagnosticQuestion[];
};
