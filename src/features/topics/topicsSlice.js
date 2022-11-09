import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postTopic, getTopics } from "../../api/topics";

export const addTopic = createAsyncThunk("topics/addTopic", async (arg) => {
  const response = await postTopic(arg);
  return response;
});

export const loadTopics = createAsyncThunk("topics/loadTopics", async (arg) => {
  const response = await getTopics();
  return response;
});

const option = {
  name: "topics",
  initialState: {
    topics: [],
    isAddTopicPending: false,
    isAddTopicHasError: false,
    isLoadTopicsPending: false,
    isLoadTopicsHasError: false,
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
    [loadTopics.pending]: (state, action) => {
      state.isLoadTopicsPending = true;
      state.isLoadTopicsHasError = false;
    },
    [loadTopics.fulfilled]: (state, action) => {
      state.isLoadTopicsPending = false;
      state.isLoadTopicsHasError = false;
      state.topics = action.payload;
    },
    [loadTopics.rejected]: (state, action) => {
      state.isLoadTopicsPending = false;
      state.isLoadTopicsHasError = true;
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

export const selectAllTopics = (state) => state.topicsReducer.topics;
