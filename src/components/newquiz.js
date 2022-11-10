import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTopics } from "../features/topics/topicsSlice";
import { loadTopics } from "../features/topics/topicsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { selectAddQuizStatus } from "../features/quizzes/quizzesSlice";
import { Modal } from "./modal";

import * as Yup from "yup";
import { Formik, Field, Form, FieldArray } from "formik";

export const NewQuiz = () => {
  const dispatch = useDispatch();
  const allTopics = useSelector(selectAllTopics);
  const addQuizStatus = useSelector(selectAddQuizStatus);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(loadTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (values) => {
    await dispatch(addQuiz(values));
  };
  const updateModal = (callback) => {
    setShowModal(!showModal);
    if (typeof callback === "function") {
      callback();
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
              },
            },
            cards: [],
          }}
          validationSchema={Yup.object().shape({
            quiz: Yup.object().shape({
              title: Yup.string().required("Quiz Title is required."),
              topic: Yup.object().shape({
                id: Yup.string().required("A Topic needs to be selected."),
              }),
            }),
          })}
          validateOnMount={true}
          onSubmit={async (values, actions) => {
            await handleSubmit(values);
            updateModal(() => {
              actions.resetForm();
            });
          }}
        >
          {({ isValid, values }) => (
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
                  >
                    <option value={undefined}>Choose a topic</option>
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
                          disabled={addQuizStatus.isPending || !isValid}
                        >
                          {addQuizStatus.isPending && "Creating..."}{" "}
                          {!addQuizStatus.isPending && "Create Quiz"}
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
      <Modal
        showModal={showModal}
        onShowModal={updateModal}
        title="Create status"
        body={`Succefully adding to quiz list`}
        buttonMessage="Got, it. thanks!"
      />
    </NewQuizWrapper>
  );
};

const NewQuizWrapper = styled.div``;
const NewQuizMaxWidth = styled.div``;
