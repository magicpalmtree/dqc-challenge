import { useState, useCallback, useMemo } from 'react';
import moment from 'moment';

// Type definitions for survey questions and results
export type OpinionScaleQuestion = {
  question_text: string;
  type: 'number';
  responses: number[];
};

export type FreeTextQuestion = {
  question_text: string;
  type: 'text';
  responses: string[];
};

export type SurveyResult = {
  survey_title: string;
  created_at: string;
  questions: (OpinionScaleQuestion | FreeTextQuestion)[];
};

// Interface defining the return type of the useSurvey hook
interface UseSurveyReturn {
  setResult: (result: SurveyResult) => void; // Function to set the survey result
  getTitle: () => string; // Function to get the survey title
  getCreatedAt: () => string; // Function to get the formatted creation date of the survey
  getNumberOfPeople: () => number; // Function to get the number of people who responded to the survey
  getFreeTextQuestions: () => FreeTextQuestion[]; // Function to get an array of free-text questions
  getHappinessScore: () => string; // Function to get the overall happiness score for opinion scale questions
}

// Custom hook to handle survey data and calculations related to happiness scores
export default function useSurvey(): UseSurveyReturn {
  // State to store the survey result
  const [result, setResult] = useState<SurveyResult>(null!);

  // Memoized array of free-text questions from the survey
  const freeTextQs = useMemo<FreeTextQuestion[]>(
    () => (result?.questions || []).filter((q) => q.type === 'text') as FreeTextQuestion[],
    [result?.questions]
  );

  // Memoized array of opinion scale questions from the survey
  const opinionScaleQs = useMemo<OpinionScaleQuestion[]>(
    () => (result?.questions || []).filter((q) => q.type === 'number') as OpinionScaleQuestion[],
    [result?.questions]
  );

  // Function to get the survey title
  const getTitle = (): string => result?.survey_title || '';

  // Function to get the creation date of the survey in a formatted string
  const getCreatedAt = (): string => moment(result?.created_at || '').format('DD.MM.YYYY');

  // Function to get the number of people who responded to the survey
  const getNumberOfPeople = (): number => opinionScaleQs[0]?.responses.length || 0;

  // Function to get an array of free-text questions from the survey
  const getFreeTextQuestions = (): FreeTextQuestion[] => freeTextQs;

  // Function to calculate the happiness score for an opinion scale question
  const getHappinessScore = (q: OpinionScaleQuestion): number =>
    (q.responses.reduce((score, r) => score + r) * 20) / q.responses.length;

  // Function to calculate the overall happiness score for all opinion scale questions
  const getOverallHappinessScore = useCallback(
    (): string =>
      (opinionScaleQs.reduce((overall, q) => overall + getHappinessScore(q), 0) / opinionScaleQs.length).toFixed(),
    [opinionScaleQs]
  );

  // Return an object with all the functions and data we want to expose to the component using this hook
  return {
    setResult,
    getTitle,
    getCreatedAt,
    getNumberOfPeople,
    getFreeTextQuestions,
    getHappinessScore: getOverallHappinessScore,
  };
}
