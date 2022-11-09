import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIcons } from "../../api/icons";

export const loadIcons = createAsyncThunk("icons/loadIcons", async () => {
  const response = await getIcons();
  return response;
});

const option = {
  name: "icons",
  initialState: {
    icons: [],
    isLoadIconsPending: false,
    isLoadIconsHasError: false,
  },
  reducers: {},
  extraReducers: {
    [loadIcons.pending]: (state, action) => {
      state.isLoadIconsPending = true;
      state.isLoadIconsHasError = false;
    },
    [loadIcons.fulfilled]: (state, action) => {
      state.isLoadIconsPending = false;
      state.isLoadIconsHasError = false;
      state.icons = action.payload;
    },
    [loadIcons.rejected]: (state, action) => {
      state.isLoadIconsPending = false;
      state.isLoadIconsHasError = true;
    },
  },
};

const iconsSlice = createSlice(option);

export default iconsSlice.reducer;

export const selectAllIcons = (state) => state.iconsReducer.icons;
