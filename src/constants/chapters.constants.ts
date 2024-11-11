// chapters.constants.ts
import { Subject, Grade, Semester } from './enum';

export const ChaptersMap = {
  [Subject.Math]: {
    [Grade.Grade7]: {
      [Semester.First]: ["Numbers", "Algebra", "Geometry"],
      [Semester.Second]: ["Fractions", "Decimals", "Probability"],
      [Semester.Third]: ["Equations", "Trigonometry"],
    },
    [Grade.Grade8]: {
      [Semester.First]: ["Functions", "Graphs"],
      [Semester.Second]: ["Statistics", "Polynomials"],
      [Semester.Third]: ["Calculus", "Sequences"],
    },
    [Grade.Grade9]: {
      [Semester.First]: ["Vectors", "Matrices"],
      [Semester.Second]: ["Integration", "Differentiation"],
      [Semester.Third]: ["Complex Numbers", "Limits"],
    },
  },
  [Subject.Arabic]: {
    [Grade.Grade7]: {
      [Semester.First]: ["Grammar", "Reading Comprehension"],
      [Semester.Second]: ["Writing", "Vocabulary"],
      [Semester.Third]: ["Poetry", "Prose"],
    },
    // Add more chapters for Arabic for other grades and semesters...
  },
  [Subject.English]: {
    [Grade.Grade7]: {
      [Semester.First]: ["Grammar Basics", "Short Stories"],
      [Semester.Second]: ["Essay Writing", "Literature"],
      [Semester.Third]: ["Advanced Vocabulary", "Drama"],
    },
    // Add more chapters for English for other grades and semesters...
  },
};
