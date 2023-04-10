"use client";

import {
  selectPage,
  selectQueryLoading,
  selectQuerySearch,
  selectRegion,
} from "@/store/query.slice";
import { CountryObj } from "./Countries";
import Country from "./Country";
import InfinityLoader from "./InfinityLoader";
import { useAppSelector } from "@/hooks";
import regions from "@/public/regions.json";

import s from "./countriesList.module.scss";

const CountriesList = ({ countries }: { countries: CountryObj[] }) => {
  const page = useAppSelector(selectPage);
  const isLoading = useAppSelector(selectQueryLoading);
  const regionId = useAppSelector(selectRegion);
  const search = useAppSelector(selectQuerySearch);

  const regionFiltered =
    regionId !== 0
      ? countries.filter((country) => country.region === regions[regionId])
      : countries;

  const keywords = search
    .toLowerCase()
    .replace(/^a-zA-Z0-9 ]|[()]/g, "")
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

  if (filteredCountries.length === 0) {
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
