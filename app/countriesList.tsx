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

  const regex = new RegExp(`${search}`, "gi");
  const filteredCountries = regionFiltered.filter(
    (country) =>
      country.name
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .match(regex) ||
      country.alpha3Code.toLowerCase().includes(search.toLowerCase())
  );

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
