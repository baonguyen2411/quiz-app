import React, { Suspense, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const QuizPage = React.lazy(() => import("./pages/QuizPage"));
const ResultQuizPage = React.lazy(() => import("./pages/ResultQuizPage"));

import QuizContext from "./contexts/QuizContext";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizPage />,
  },
  {
    path: "/result-quiz",
    element: <ResultQuizPage />,
  },
]);

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [draftAnswers, setDraftAnswers] = useState({});

  console.table(questions);

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        draftAnswers,
        setDraftAnswers,
      }}
    >
      <Suspense fallback={<p>Loading....</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </QuizContext.Provider>
  );
}

export default App;
