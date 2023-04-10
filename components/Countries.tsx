import CountriesList from "./CountriesList";
import countriesData from "@/public/data.json";

export interface CountryObj {
  name: string;
  capital?: string;
  region: string;
  population: number | string;
  flag: string;
  alpha3Code: string;
}

export const getCountries = async () => {
  const countries = countriesData.map((country) => ({
    name: country.name,
    capital: country.capital,
    region: country.region,
    population: country.population.toLocaleString(),
    flag: country.flag,
    alpha3Code: country.alpha3Code,
  }));

  return countries;
};

const Countries = async () => {
  const countries = await getCountries();

  return <CountriesList countries={countries} />;
};

export default Countries;
