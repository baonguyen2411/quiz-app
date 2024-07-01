import { memo, useMemo } from "react";

import "./styles.css";

function shuffleArray(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const QuestionItem = ({
  isResult,
  question,
  correct_answer,
  incorrect_answers,
  draftAnswer,
  answer,
  setDraftAnswers,
}) => {
  const answers = useMemo(() => {
    return [...incorrect_answers, correct_answer];
  }, [correct_answer, incorrect_answers]);

  const handleGetBtnClasses = (value) => {
    let btnClasses = "";
    if (draftAnswer === value) {
      btnClasses = "active-draft-answer";
    } else {
      if (isResult && value === correct_answer) {
        btnClasses = "active-correct-answer";
      } else if (answer === value && incorrect_answers.includes(answer)) {
        btnClasses = "active-incorrect-answwer";
      }
    }
    return btnClasses;
  };

  return (
    <div>
      <p>{`${question}`}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {answers?.map((value) => (
          <button
            key={answer}
            type="button"
            className={handleGetBtnClasses(value)}
            onClick={() => {
              if (!isResult) {
                setDraftAnswers((previousDraftAnswers) => ({
                  ...previousDraftAnswers,
                  [question]: value,
                }));
              }
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(QuestionItem);
