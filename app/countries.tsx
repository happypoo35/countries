import CountriesList from "./countriesList";
import fsPromises from "fs/promises";
import path from "path";

export interface CountryObj {
  name: string;
  capital: string;
  region: string;
  population: number | string;
  flag: string;
  alpha3Code: string;
}

export const getCountries = async () => {
  const filePath = path.join(process.cwd(), "public/data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const data: CountryObj[] = JSON.parse(jsonData.toString());

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
