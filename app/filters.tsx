"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import { useAppDispatch, useAppSelector, useDebounce } from "@hooks";
import { selectQuery, setQueryPage, setQuerySearch } from "rtk/query.slice";
// import { useGlobalContext } from "../context";
// import Select from "./Select";

import s from "./form.module.scss";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const searchValue = useRef(null);
  const query = useAppSelector(selectQuery);

  const debounced = useDebounce(search, 200);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search && debounced) {
      params.append("s", debounced);
      router.replace(`?${params}`);
      dispatch(setQueryPage(""));
      // dispatch(setQuerySearch(debounced));
    } else if (!search && debounced) {
      params.delete("s");
      router.replace("");
      dispatch(setQueryPage(""));
      // dispatch(setQuerySearch(""));
    }
  }, [debounced, search, dispatch, router]);

  // useEffect(() => {
  //   const params = new URLSearchParams(query);
  //   console.log(query);

  //   // params.toString() ? router.replace(`?${params}`) : router.replace("");
  // }, [query, router]);

  return (
    <section className={s.search} aria-label="search section">
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <div className={s.input}>
          <FaSearch />
          <input
            type="text"
            autoComplete="off"
            placeholder="Search for a country..."
            aria-label="search field"
            ref={searchValue}
            value={search}
            // onChange={searchCountry}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* <Select /> */}
      </form>
    </section>
  );
};

export default Filters;
