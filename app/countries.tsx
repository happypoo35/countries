// import { useEffect } from "react";
// import { useGlobalContext } from "../context";
// import Country from "./Country";

import Country from "./country";

import s from "./countries.module.scss";
import PageLoader from "./pageLoader";
import CountriesList from "./countriesList";

export interface CountryObj {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
}

const getCountries = async (search?: string): Promise<CountryObj[]> => {
  const res = await fetch(
    `https://restcountries.com/v2/${
      search ? `name/${search}/` : "all/"
    }?fields=name,capital,region,population,flag`
  );

  if (!res.ok) return [];

  return res.json();
};

// import Loading from "./Loading";
const Countries = async ({ search }: { search?: string }) => {
  const countries = await getCountries(search);

  if (countries.length < 1) {
    return (
      <div className="empty-result">
        <h2>No countries matched your search criteria</h2>
      </div>
    );
  }

  return (
    <section className={s.countries} aria-label="countries list">
      <CountriesList countries={countries} />
      {/* {countries.slice(0, 12).map((el, id) => (
        <Country key={id} data={el} />
      ))} */}
      <PageLoader nHits={countries.length} />
    </section>
  );
};

export default Countries;
