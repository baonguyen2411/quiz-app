import { memo } from "react";

import QuestionItem from "../QuestionItem";

const QuestionList = ({
  isResult,
  questions,
  draftAnswers,
  answers,
  setDraftAnswers,
}) => {
  return (
    <div>
      {questions?.map((question) => (
        <QuestionItem
          key={question.question}
          isResult={isResult}
          draftAnswer={draftAnswers?.[question.question]}
          answer={answers?.[question.question]}
          setDraftAnswers={setDraftAnswers}
          {...question}
        />
      ))}
    </div>
  );
};

export default memo(QuestionList);
