import { useCallback } from 'react';
import type { IGroup, IColumn } from '@fluentui/react';
import type { FreeTextQuestion } from './useSurvey';

type IItem = {
  key: string;
  name: string;
};

// Interface defining the return type of the useFreeTextSurvey hook
interface UseFreeTextSurveyReturn {
  getItems: () => IItem[]; // Function to get an array of items (free-text responses)
  getGroups: () => IGroup[]; // Function to get an array of groups (question groupings)
  getColumns: () => IColumn[]; // Function to get an array of columns (column configuration)
}

// Custom hook to handle survey data of free-text questions
export default function useFreeTextSurvey(questions: FreeTextQuestion[]): UseFreeTextSurveyReturn {
  // Function to get an array of items (free-text responses)
  const getItems = useCallback<() => IItem[]>(
    () =>
      ([] as { key: string; name: string }[]).concat(
        ...questions.map((q) =>
          q.responses.map((r) => ({
            key: r + Math.random(),
            name: r,
          }))
        )
      ),
    [questions]
  );

  // Function to get an array of groups (question groupings)
  const getGroups = useCallback<() => IGroup[]>(() => {
    const groups: IGroup[] = [];
    let startIdx = 0;

    // Create a group for each question and set its properties
    questions.forEach((q) => {
      groups.push({
        key: q.question_text,
        name: q.question_text,
        startIndex: startIdx,
        count: q.responses.length,
        level: 0,
      });

      startIdx += q.responses.length;
    });

    return groups;
  }, [questions]);

  // Function to get an array of columns (column configuration)
  const getColumns = useCallback<() => IColumn[]>(
    () => [
      {
        key: 'name',
        name: 'Text answers',
        fieldName: 'name',
        minWidth: 200,
      },
    ],
    []
  );

  // Return an object with all the functions we want to expose to the component using this hook
  return {
    getItems,
    getGroups,
    getColumns,
  };
}
