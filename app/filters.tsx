"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "./select";

import { useAppDispatch, useAppSelector, useDebounce } from "@hooks";
import {
  selectQuerySearch,
  setQueryLoading,
  setQueryPage,
  setQuerySearch,
} from "rtk/query.slice";

import s from "./filters.module.scss";

const Filters = () => {
  const querySearch = useAppSelector(selectQuerySearch);
  const [search, setSearch] = useState(querySearch);

  const dispatch = useAppDispatch();
  const searchValue = useRef(null);

  const debounced = useDebounce(search, 200);

  useEffect(() => {
    dispatch(setQueryLoading(search !== debounced));
  }, [search, debounced, dispatch]);

  useEffect(() => {
    if (debounced !== querySearch) {
      dispatch(setQuerySearch(debounced));
      dispatch(setQueryPage(1));
    }
  }, [dispatch, debounced, querySearch]);

  return (
    <section className={s.section} aria-label="search section">
      <div className={s.input}>
        <FaSearch />
        <input
          type="text"
          autoComplete="off"
          placeholder="Search for a country..."
          aria-label="search field"
          ref={searchValue}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select />
    </section>
  );
};

export default Filters;
