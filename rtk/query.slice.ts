import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type QueryState = {
  s?: string;
  page?: string;
};

const initialState: QueryState = {};
// const initialState = {
//   s: "",
//   page: "1",
// };

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuerySearch: (state, { payload }: PayloadAction<string>) => {
      payload ? (state.s = payload) : delete state.s;
    },
    setQueryPage: (state, { payload }: PayloadAction<string>) => {
      payload ? (state.page = payload) : delete state.page;
    },
  },
});

export const selectQuery = (state: RootState) => state.query;

export const { setQuerySearch, setQueryPage } = querySlice.actions;

const queryReducer = querySlice.reducer;
export default queryReducer;
