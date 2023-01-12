"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import { useAppDispatch, useDebounce } from "@hooks";
import { setQueryLoading, setQueryPage } from "rtk/query.slice";
// import { useGlobalContext } from "../context";
import Select from "./select";

import s from "./filters.module.scss";

const Filters = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);

  const dispatch = useAppDispatch();
  const searchValue = useRef(null);

  const debounced = useDebounce(search, 200);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search && debounced) {
      params.append("s", debounced);
      router.replace(`?${params}`);
      dispatch(setQueryPage(1));
    } else if (!search && debounced) {
      params.delete("s");
      router.replace("");
      dispatch(setQueryPage(1));
    }
  }, [debounced, search, dispatch, router]);

  useEffect(() => {
    if (searchQuery !== search) {
      dispatch(setQueryLoading(true));
    } else {
      dispatch(setQueryLoading(false));
    }
  }, [searchQuery, dispatch, search]);

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
