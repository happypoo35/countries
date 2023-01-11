import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type QueryState = {
  loading: boolean;
  page?: number;
  region: string;
};

const initialState: QueryState = {
  loading: false,
  region: "All",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQueryLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setQueryPage: (state, { payload }: PayloadAction<number>) => {
      payload ? (state.page = payload) : delete state.page;
    },
    setQueryRegion: (state, { payload }: PayloadAction<string>) => {
      state.region = payload;
    },
  },
});

export const selectQueryLoading = (state: RootState) => state.query.loading;
export const selectPage = (state: RootState) => state.query.page;
export const selectRegion = (state: RootState) => state.query.region;

export const { setQueryLoading, setQueryPage, setQueryRegion } =
  querySlice.actions;

const queryReducer = querySlice.reducer;
export default queryReducer;
