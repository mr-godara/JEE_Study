export interface Chapter {
  id: number;
  title: string;
  class: string;
  unit: string;
  status: "completed" | "in_progress" | "not_started";
  isWeak: boolean;
  isAnonymous: boolean;
  stats: {
    y2025: string;
    y2024: string;
    trend: "up" | "down" | "stable";
    total: number;
    totalQuestions: number;
  };
}

export interface SubjectData {
  description: string;
  chapters: Chapter[];
}

export interface SubjectsDataType {
  [key: string]: SubjectData;
}