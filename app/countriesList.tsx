"use client";

import {
  selectPage,
  selectQueryLoading,
  selectQuerySearch,
  selectRegion,
} from "store/query.slice";
import { CountryObj } from "./countries";
import Country from "./country";
import InfinityLoader from "./infinityLoader";
import { useAppSelector } from "@hooks";

import s from "./countriesList.module.scss";

const CountriesList = ({ countries }: { countries: CountryObj[] }) => {
  const page = useAppSelector(selectPage);
  const isLoading = useAppSelector(selectQueryLoading);
  const region = useAppSelector(selectRegion);
  const search = useAppSelector(selectQuerySearch);

  const regionFiltered =
    region !== "All"
      ? countries.filter((country) => country.region === region)
      : countries;

  const keywords = search
    .toLowerCase()
    .replace(/^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter((s) => s !== "");

  const filteredCountries =
    keywords.length === 0
      ? regionFiltered
      : regionFiltered.filter((country) => {
          const words = `${country.name
            .normalize("NFD")
            .replace(/\p{Diacritic}|[()]/gu, "")} ${country.alpha3Code}`
            .toLowerCase()
            .split(" ");

          return keywords.every((kw) => words.some((w) => w.startsWith(kw)));
        });

  if (filteredCountries.length < 1) {
    return (
      <div className={s.empty}>
        <h2>No countries matched your search criteria</h2>
      </div>
    );
  }

  return (
    <>
      <section
        className={s.countries}
        aria-label="countries list"
        data-loading={isLoading || undefined}
      >
        {filteredCountries.slice(0, (page || 1) * 12).map((el, id) => (
          <Country key={id} data={el} />
        ))}
      </section>
      <InfinityLoader nHits={filteredCountries.length} />
    </>
  );
};

export default CountriesList;
