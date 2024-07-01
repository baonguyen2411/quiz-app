import { useContext, useEffect, useState } from "react";

import QuizContext from "../contexts/QuizContext";

const useQuestions = () => {
  const { questions, setQuestions, setDraftAnswers, setAnswers } =
    useContext(QuizContext);

  const handleFetchQuestions = async ({
    category,
    difficulty,
    amount = 5,
    type = "multiple",
  }) => {
    try {
      const resp = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      const response = await resp.json();

      if (response?.results) {
        setQuestions(response.results);

        if (response.results?.length) {
          setAnswers(
            response.results.reduce((accumulator, currentValue) => {
              return {
                ...accumulator,
                [currentValue.question]: null,
              };
            }, {})
          );
          setDraftAnswers(
            response.results.reduce((accumulator, currentValue) => {
              return {
                ...accumulator,
                [currentValue.question]: null,
              };
            }, {})
          );
        }
      }
    } catch (error) {
      console.log("Fetch questions error!", error.message);
    }
  };

  return {
    questions,
    setQuestions,
    handleFetchQuestions,
  };
};

export default useQuestions;
