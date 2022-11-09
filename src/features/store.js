import { configureStore } from "@reduxjs/toolkit";
import iconsSliceReducer from "./icons/iconsSlice";

export const store = configureStore({
  reducer: {
    iconsReducer: iconsSliceReducer,
  },
});
