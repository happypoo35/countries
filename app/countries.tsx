import CountriesList from "./countriesList";

export interface CountryObj {
  name: string;
  capital: string;
  region: string;
  population: number | string;
  flag: string;
  alpha3Code: string;
}

export const getCountries = async (search?: string): Promise<CountryObj[]> => {
  const res = await fetch(
    `https://restcountries.com/v2/${
      search ? `name/${search}/` : "all/"
    }?fields=name,capital,region,population,flag,alpha3Code`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data: CountryObj[] = await res.json();
  data.forEach(
    (el, id) => (data[id].population = el.population.toLocaleString())
  );

  return data;
};

const Countries = async ({ search }: { search?: string }) => {
  const countries = await getCountries(search);

  return <CountriesList countries={countries} />;
};

export default Countries;
