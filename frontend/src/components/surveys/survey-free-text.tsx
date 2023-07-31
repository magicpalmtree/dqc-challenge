import { type FunctionComponent, memo } from 'react';
import { CheckboxVisibility, DetailsList, Stack } from '@fluentui/react';
import useFreeTextSurvey from '../../hooks/useFreeTextSurvey';
import type { FreeTextQuestion } from '../../hooks/useSurvey';

interface SurveyFreeTextProps {
  questions: FreeTextQuestion[];
}

const SurveyFreeText: FunctionComponent<SurveyFreeTextProps> = ({ questions }) => {
  const { getItems, getGroups, getColumns } = useFreeTextSurvey(questions);

  return (
    <Stack data-testid="FreeTextTable">
      <DetailsList
        checkboxVisibility={CheckboxVisibility.hidden}
        items={getItems()}
        columns={getColumns()}
        groups={getGroups()}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="Select row"
        checkButtonGroupAriaLabel="Select section"
        groupProps={{
          isAllGroupsCollapsed: true,
          showEmptyGroups: true,
        }}
        compact={true}
      />
    </Stack>
  );
};

export default memo(SurveyFreeText);
