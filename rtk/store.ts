import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./query.slice";

export const store = configureStore({
  reducer: {
    query: queryReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
