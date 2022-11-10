import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCards } from "../../api/cards";

export const loadCards = createAsyncThunk("cards/loadCards", async (id) => {
  const response = await getCards(id);
  return response;
});

const option = {
  name: "cards",
  initialState: {
    cards: [],
    isLoadCardsPending: false,
    isLoadCardsHasError: false,
  },
  reducers: {},
  extraReducers: {
    [loadCards.pending]: (state, action) => {
      state.isLoadCardsPending = true;
      state.isLoadCardsHasError = false;
    },
    [loadCards.fulfilled]: (state, action) => {
      state.isLoadCardsPending = false;
      state.isLoadCardsHasError = false;
      state.cards = action.payload;
    },
    [loadCards.rejected]: (state, action) => {
      state.isLoadCardsPending = false;
      state.isLoadCardsHasError = true;
    },
  },
};

const cardsSlice = createSlice(option);

export default cardsSlice.reducer;

export const selectAllCard = (state) => state.cardsReducer.cards;
