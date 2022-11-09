import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postTopic } from "../../api/topics";

export const addTopic = createAsyncThunk("topics/addTopic", async (arg) => {
  const response = await postTopic(arg);
  return response;
});

const option = {
  name: "topics",
  initialState: {
    isAddTopicPending: false,
    isAddTopicHasError: false,
  },
  reducers: {},
  extraReducers: {
    [addTopic.pending]: (state, action) => {
      state.isAddTopicPending = true;
      state.isAddTopicHasError = false;
    },
    [addTopic.fulfilled]: (state, action) => {
      state.isAddTopicPending = false;
      state.isAddTopicHasError = false;
    },
    [addTopic.rejected]: (state, action) => {
      state.isAddTopicPending = false;
      state.isAddTopicHasError = true;
    },
  },
};

const topicsSlice = createSlice(option);

export default topicsSlice.reducer;

export const selectAddTopicStatus = (state) => {
  return {
    isPending: state.topicsReducer.isAddTopicPending,
    hasError: state.topicsReducer.isAddTopicHasError,
  };
};
