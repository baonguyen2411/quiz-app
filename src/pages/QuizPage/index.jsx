import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCategories from "../../hooks/useCategories";
import useQuestions from "../../hooks/useQuestions";

import QuestionList from "../../components/QuestionList";

import "./styles.css";
import useAnswers from "../../hooks/useAswers";

const DIFFICULTY_LEVELS = [
  {
    id: "easy",
    name: "Easy",
  },
  {
    id: "medium",
    name: "Medium",
  },
  {
    id: "hard",
    name: "Hard",
  },
];

const QuizPage = () => {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const navigate = useNavigate();

  const [categories] = useCategories();
  const { questions, handleFetchQuestions } = useQuestions();
  const { draftAnswers, setDraftAnswers, setAnswers } = useAnswers();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFetchQuestions({ category, difficulty });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmitAnswers = () => {
    setAnswers({ ...draftAnswers });
    setDraftAnswers({});
    navigate("/result-quiz");
  };

  return (
    <div className="quiz-page">
      <h1>QUIZ MAKER</h1>
      <form className="quiz-page-form" onSubmit={handleSubmit}>
        <select
          id="categorySelect"
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="" selected disabled>
            Select a category
          </option>
          {categories?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select
          id="difficultySelect"
          name="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="" selected disabled>
            Select difficulty
          </option>
          {DIFFICULTY_LEVELS.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <button id="createBtn" type="submit">
          Create
        </button>
      </form>
      <QuestionList
        questions={questions}
        draftAnswers={draftAnswers}
        setDraftAnswers={setDraftAnswers}
      />
      {questions.length ? (
        <button
          className="quiz-page-submit-btn"
          onClick={handleSubmitAnswers}
          disabled={Object.values(draftAnswers).some(
            (draftAnswer) => draftAnswer === null
          )}
        >
          Submit
        </button>
      ) : null}
    </div>
  );
};

export default memo(QuizPage);
