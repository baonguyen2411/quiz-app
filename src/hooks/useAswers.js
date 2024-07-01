import { useContext, useEffect } from "react";

import QuizContext from "../contexts/QuizContext";

const useAnswers = () => {
  const { questions, answers, setAnswers, draftAnswers, setDraftAnswers } =
    useContext(QuizContext);

  return {
    answers,
    setAnswers,
    draftAnswers,
    setDraftAnswers,
  };
};

export default useAnswers;
