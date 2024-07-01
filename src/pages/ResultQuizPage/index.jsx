import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useQuestions from "../../hooks/useQuestions";
import useAnswers from "../../hooks/useAswers";

import QuestionList from "../../components/QuestionList";

import "./styles.css";

const ResultQuizPage = () => {
  const { questions, setQuestions } = useQuestions();
  const { answers, setAnswers } = useAnswers();

  const navigate = useNavigate();

  const handleCreateANewQuiz = () => {
    setQuestions([]);
    setAnswers({});
    navigate("/");
  };

  const score = useMemo(() => {
    let count = 0;

    questions.forEach(({ question, correct_answer }) => {
      if (correct_answer === answers[question]) {
        count++;
      }
    });

    return count;
  }, [questions, answers]);

  let bgScore = "red";
  if (score === 2 || score === 3) {
    bgScore = "yellow";
  } else if (score === 4 || score === 5) {
    bgScore = "green";
  }

  return (
    <div className="result-quiz-page">
      <h1>RESULTS</h1>
      <QuestionList isResult questions={questions} answers={answers} />
      <div
        className="result-quiz-page-score"
        style={{
          backgroundColor: bgScore,
        }}
      >
        <p>{`You scored ${score} out of ${questions.length}`}</p>
      </div>
      <button onClick={handleCreateANewQuiz}>Create a new quiz</button>
    </div>
  );
};

export default memo(ResultQuizPage);
