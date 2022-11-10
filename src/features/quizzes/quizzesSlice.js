import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuizzes, postQuiz } from "../../api/quizzes";

export const addQuiz = createAsyncThunk("quizzes/addQuiz", async (arg) => {
  const response = await postQuiz(arg);
  return response;
});

export const loadQuizzes = createAsyncThunk("quizzes/loadQuizzes", async () => {
  const response = await getQuizzes();
  return response;
});

const option = {
  name: "quizzes",
  initialState: {
    quizzes: [],
    isAddQuizPending: false,
    isAddQuizHasError: false,
    isLoadQuizzesPending: false,
    isLoadQuizzesHasError: false,
  },
  reducers: {},
  extraReducers: {
    [addQuiz.pending]: (state, action) => {
      state.isAddQuizPending = true;
      state.isAddQuizHasError = false;
    },
    [addQuiz.fulfilled]: (state, action) => {
      state.isAddQuizPending = false;
      state.isAddQuizHasError = false;
    },
    [addQuiz.rejected]: (state, action) => {
      state.isAddQuizPending = false;
      state.isAddQuizHasError = true;
    },
    [loadQuizzes.pending]: (state, action) => {
      state.isLoadQuizzesPending = true;
      state.isLoadQuizzesHasError = false;
    },
    [loadQuizzes.fulfilled]: (state, action) => {
      state.isLoadQuizzesPending = false;
      state.isLoadQuizzesHasError = false;
    },
    [loadQuizzes.rejected]: (state, action) => {
      state.isLoadQuizzesPending = false;
      state.isLoadQuizzesHasError = true;
    },
  },
};

const quizzesSlice = createSlice(option);

export default quizzesSlice.reducer;

export const selectAllQuiz = (state) => state.quizzesReducer.quizzes;

export const selectAddQuizStatus = (state) => {
  return {
    isPending: state.quizzesReducer.isAddQuizPending,
    hasError: state.quizzesReducer.isAddQuizHasError,
  };
};
