import { useEffect } from 'react';
import { FontIcon, initializeIcons, Stack, Text } from '@fluentui/react';
import SurveyFreeText from './components/surveys/survey-free-text';
import useSurvey, { type SurveyResult } from './hooks/useSurvey';
import SURVEY_RESULT from './data/survey_results.json';
initializeIcons();

function App() {
  const { setResult, getTitle, getCreatedAt, getNumberOfPeople, getFreeTextQuestions, getHappinessScore } = useSurvey();

  useEffect(() => {
    setResult(SURVEY_RESULT as SurveyResult);

    // eslint-disable-next-line
  }, []);

  return (
    <Stack style={{ margin: 20 }}>
      <Text
        as="h1"
        variant="xxLarge"
        block
        nowrap
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 0,
          marginBottom: 20,
          color: 'black',
        }}
      >
        <FontIcon iconName="ClipboardList" style={{ marginRight: '5px' }} />
        {getTitle()}
      </Text>

      <Text as="p" variant="large" block nowrap style={{ marginTop: 0, marginBottom: 20, color: 'black' }}>
        This survey was started on {getCreatedAt()}. Overall, {getNumberOfPeople()} people participated in the survey.
      </Text>

      <Text
        data-testid="happinessScore"
        as="h2"
        variant="xxLarge"
        block
        nowrap
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 0,
          marginBottom: 20,
          color: 'black',
        }}
      >
        <FontIcon iconName="ChatBot" style={{ marginRight: '5px' }} />
        {getHappinessScore()} / 100
      </Text>

      <Stack>
        <SurveyFreeText questions={getFreeTextQuestions()} />
      </Stack>
    </Stack>
  );
}

export default App;
