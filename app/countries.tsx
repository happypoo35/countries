import CountriesList from "./countriesList";
import countriesData from "@public/data.json";

export interface CountryObj {
  name: string;
  capital?: string;
  region: string;
  population: number | string;
  flag: string;
  alpha3Code: string;
}

export const getCountries = async () => {
  const data = countriesData;

  const countries = data.map((el, id) => {
    const { name, capital, region, population, flag, alpha3Code, ...rest } = el;
    return {
      name,
      capital,
      region,
      population: population.toLocaleString(),
      flag,
      alpha3Code,
    };
  });

  return countries;
};

const Countries = async () => {
  const countries = await getCountries();

  return <CountriesList countries={countries} />;
};

export default Countries;
