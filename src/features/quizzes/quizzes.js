import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadQuizzes, selectAllQuiz } from "./quizzesSlice";
import { useNavigate } from "react-router-dom";
import "./quizzes.css";

export const Quizzes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allQuiz = useSelector(selectAllQuiz);
  useEffect(() => {
    dispatch(loadQuizzes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <QuizzesWrapper className="mt-14">
      <QuizzesMaxWidth>
        <section className="max-w-[500px] mr-auto ml-auto">
          {!(allQuiz.length !== 0) ? (
            <div className="text-center">
              <p className="font-bold text-2xl">Quizzes</p>
              <button
                type="button"
                className="font-bold border mt-5 py-2 px-6 button-15"
                onClick={() => navigate("/new-quiz")}
              >
                Create New Quiz
              </button>
            </div>
          ) : (
            allQuiz.map((quiz) => (
              <div key={quiz.id} className="flex justify-between mt-10">
                <div>
                  <span className="px-4 py-2 bg-indigo-700 font-bold text-white rounded-lg">
                    {quiz.topic.name}
                  </span>
                  <p className="mt-3 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 drop-shadow-md">
                    {quiz.title}
                  </p>
                </div>
                <button type="button" className="button-54">
                  Play Quiz
                </button>
              </div>
            ))
          )}
        </section>
      </QuizzesMaxWidth>
    </QuizzesWrapper>
  );
};

const QuizzesWrapper = styled.div``;
const QuizzesMaxWidth = styled.div``;
