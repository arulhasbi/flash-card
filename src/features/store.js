import { configureStore } from "@reduxjs/toolkit";
import iconsSliceReducer from "./icons/iconsSlice";
import topicsSliceReducer from "./topics/topicsSlice";
import quizzesSliceReducer from "./quizzes/quizzesSlice";

export const store = configureStore({
  reducer: {
    iconsReducer: iconsSliceReducer,
    topicsReducer: topicsSliceReducer,
    quizzesReducer: quizzesSliceReducer,
  },
});
