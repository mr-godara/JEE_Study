import { SubjectsDataType } from "./types";
import allSubjectsChapterData from "./all_subjects_chapter_data.json";

// Process the raw data to match our expected format
const processChapterData = (subject: string) => {
  const chapters = allSubjectsChapterData
    .filter(item => item.subject.toLowerCase() === subject.toLowerCase())
    .map((item, index) => ({
      id: index + 1,
      title: item.chapter,
      class: item.class,
      unit: item.unit,
      status: item.status.toLowerCase().replace(" ", "_") as "completed" | "in_progress" | "not_started",
      isWeak: item.isWeakChapter,
      isAnonymous: false,
      stats: {
        y2025: item.yearWiseQuestionCount["2025"].toString(),
        y2024: item.yearWiseQuestionCount["2024"].toString(),
        trend: getTrend(item.yearWiseQuestionCount["2025"], item.yearWiseQuestionCount["2024"]),
        total: item.questionSolved,
        totalQuestions: Object.values(item.yearWiseQuestionCount).reduce((a, b) => a + b, 0),
      },
    }));

  return chapters;
};

const getTrend = (current: number, previous: number): "up" | "down" | "stable" => {
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "stable";
};

export const subjectsData: SubjectsDataType = {
  physics: {
    description: "Chapter-wise Collection of Physics PYQs",
    chapters: processChapterData("Physics"),
  },
  chemistry: {
    description: "Chapter-wise Collection of Chemistry PYQs",
    chapters: processChapterData("Chemistry"),
  },
  mathematics: {
    description: "Chapter-wise Collection of Mathematics PYQs",
    chapters: processChapterData("Mathematics"),
  },
};