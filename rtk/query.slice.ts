import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type QueryState = {
  loading: boolean;
  page: number;
  region: string;
  search: string;
};

const initialState: QueryState = {
  loading: false,
  region: "All",
  search: "",
  page: 1,
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuerySearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setQueryLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setQueryPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setQueryRegion: (state, { payload }: PayloadAction<string>) => {
      state.region = payload;
    },
  },
});

export const selectQuerySearch = (state: RootState) => state.query.search;
export const selectQueryLoading = (state: RootState) => state.query.loading;
export const selectPage = (state: RootState) => state.query.page;
export const selectRegion = (state: RootState) => state.query.region;

export const { setQueryLoading, setQueryPage, setQueryRegion, setQuerySearch } =
  querySlice.actions;

const queryReducer = querySlice.reducer;
export default queryReducer;
