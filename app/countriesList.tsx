"use client";

import { useSelector } from "react-redux";
import {
  selectPage,
  selectQueryLoading,
  selectQuerySearch,
  selectRegion,
} from "rtk/query.slice";
import { CountryObj } from "./countries";
import Country from "./country";
import PageLoader from "./pageLoader";

import s from "./countriesList.module.scss";

const CountriesList = ({ countries }: { countries: CountryObj[] }) => {
  const page = useSelector(selectPage);
  const isLoading = useSelector(selectQueryLoading);
  const region = useSelector(selectRegion);
  const search = useSelector(selectQuerySearch);

  const regionFiltered =
    region !== "All"
      ? countries.filter((country) => country.region === region)
      : countries;

  const regex = new RegExp(`${search}`, "gi");
  const filteredCountries = regionFiltered.filter((country) =>
    country.name
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .match(regex)
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
      <PageLoader nHits={filteredCountries.length} />
    </>
  );
};

export default CountriesList;
