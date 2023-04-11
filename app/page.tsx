import { CountriesList, Filters } from "@/components";
import countriesData from "@/public/data.json";

const countries = countriesData.map((country) => ({
  name: country.name,
  capital: country.capital,
  region: country.region,
  population: country.population.toLocaleString(),
  flag: country.flag,
  alpha3Code: country.alpha3Code,
}));

export type CountryObj = typeof countries;

const Home = () => (
  <>
    <Filters />
    <CountriesList countries={countries} />
  </>
);

export default Home;
