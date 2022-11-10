import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTopics } from "../features/topics/topicsSlice";
import { loadTopics } from "../features/topics/topicsSlice";

import { Formik, Field, Form, FieldArray } from "formik";

export const NewQuiz = () => {
  const dispatch = useDispatch();
  const allTopics = useSelector(selectAllTopics);
  useEffect(() => {
    dispatch(loadTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleTopicChange = (topicID, callback) => {
    if (allTopics.length !== 0) {
      if (topicID === "") {
        callback("quiz.topic.id", "");
        callback("quiz.topic.name", "");
        callback("quiz.topic.iconID", "");
      } else {
        const topic = allTopics.find((topic) => topic.id === topicID);
        callback("quiz.topic.id", topic.id);
        callback("quiz.topic.name", topic.name);
        callback("quiz.topic.iconID", topic.iconID);
      }
    }
  };
  return (
    <NewQuizWrapper className="mt-10">
      <NewQuizMaxWidth>
        <Formik
          initialValues={{
            quiz: {
              title: "",
              topic: {
                id: "",
                name: "",
                iconID: "",
              },
            },
            cards: [],
          }}
          onSubmit={(values) => {
            window.alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <p className="font-bold text-2xl text-center">
                Create a New Quiz
              </p>
              <Field
                name="quiz.title"
                placeholder="Quiz Title"
                className="w-full py-2 px-3 rounded-lg border-2 border-cyan-600 mt-5"
              />
              <Field name="quiz.topic.id">
                {({ field }) => (
                  <select
                    {...field}
                    className="w-full py-2.5 px-3 rounded-lg border-2 border-cyan-600 mt-5"
                    onChange={({ target }) =>
                      handleTopicChange(target.value, setFieldValue)
                    }
                  >
                    <option value="">Choose a topic</option>
                    {allTopics.length !== 0 &&
                      allTopics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      ))}
                  </select>
                )}
              </Field>
              <hr className="mt-5" />
              <FieldArray
                name="cards"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      <div className="max-h-[300px] overflow-auto">
                        {values.cards.length > 0 &&
                          values.cards.map((_, index) => (
                            <div key={index}>
                              <Field
                                name={`cards.${index}.front`}
                                className="w-full py-2 px-3 rounded-lg border-2 border-cyan-600 mt-5"
                                placeholder="Front"
                              />
                              <Field
                                name={`cards.${index}.back`}
                                className="w-full py-2 px-3 rounded-lg border-2 border-cyan-600 mt-5"
                                placeholder="Back"
                              />
                              <div className="text-right mt-2">
                                <button
                                  type="button"
                                  className="text-red-600 font-bold"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove Card
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="font-bold border mt-5 py-2 px-6 button-15"
                          onClick={() =>
                            arrayHelpers.push({ front: "", back: "" })
                          }
                        >
                          Add Card
                        </button>
                        <button
                          type="submit"
                          className="font-bold border mt-5 py-2 px-6 button-15"
                        >
                          Create Quiz
                        </button>
                      </div>
                    </div>
                  );
                }}
              />
            </Form>
          )}
        </Formik>
      </NewQuizMaxWidth>
    </NewQuizWrapper>
  );
};

const NewQuizWrapper = styled.div``;
const NewQuizMaxWidth = styled.div``;
