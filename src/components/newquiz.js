import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTopics } from "../features/topics/topicsSlice";
import { loadTopics } from "../features/topics/topicsSlice";

export const NewQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const dispatch = useDispatch();
  const allTopics = useSelector(selectAllTopics);

  useEffect(() => {
    dispatch(loadTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <NewQuizWrapper className="mt-10">
      <NewQuizMaxWidth>
        <section onSubmit={handleSubmit}>
          <p className="font-bold text-2xl text-center grow">
            Create a new quiz
          </p>
          <form>
            <div className="form-control mt-5">
              <input
                required
                type="text"
                name="quiz-title"
                placeholder="Quiz Title"
                className="w-full py-2 px-3 rounded-lg border-2 border-cyan-600"
                value={quizTitle}
                onChange={({ target }) => setQuizTitle(target.value)}
              />
            </div>
            <div className="form-control mt-5">
              <select
                required
                name="topic"
                id="topic"
                className="w-full py-2.5 px-3 rounded-lg border-2 border-cyan-600"
                value={selectedTopic}
                onChange={({ target }) => setSelectedTopic(target.value)}
              >
                <option value="">Choose a topic</option>
                {allTopics.length !== 0 &&
                  allTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="font-bold border mt-5 py-2 px-6 button-15"
                onClick={handleAdd}
              >
                Add a card
              </button>
              <button
                type="submit"
                className="font-bold border mt-5 py-2 px-6 button-15"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </section>
      </NewQuizMaxWidth>
    </NewQuizWrapper>
  );
};

const NewQuizWrapper = styled.div``;
const NewQuizMaxWidth = styled.div``;
