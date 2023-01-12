import { notFound } from "next/navigation";
import { CountryObj, getCountries } from "app/countries";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import Border from "./border";

export const generateStaticParams = async () => {
  const countries = await getCountries();

  return countries.map((country) => ({
    slug: country.name,
  }));
};

export interface FullCountryObj extends CountryObj {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { code: string; name: string; symbol: string }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  borders: string[];
}

import s from "./page.module.scss";

const getCountry = async (code: string): Promise<FullCountryObj> => {
  const res = await fetch(
    `https://restcountries.com/v2/alpha/${code}?fullText=true&fields=name,capital,region,population,flag,nativeName,subregion,topLevelDomain,currencies,languages,borders`
  );

  if (!res.ok) notFound();

  const data: FullCountryObj = await res.json();

  data.population = data.population.toLocaleString();

  return data;
};

const keys = [
  ["Native Name", "Population", "Region", "Sub Region", "Capital"],
  ["Top Level Domain", "Currencies", "Languages"],
];

const Country = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const {
    name,
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = await getCountry(slug);

  return (
    <section aria-label={`${name} details`}>
      <Link href="/" aria-label="previous page" className={s.btn}>
        <BsArrowLeft />
        Back
      </Link>
      <article className={s.container} aria-label={name}>
        <picture /* className={s.img} */>
          <img src={flag} alt={name} />
        </picture>
        <div className={s.info}>
          <h2>{name}</h2>
          <div className={s.details}>
            <ul>
              {[nativeName, population, region, subregion, capital].map(
                (el, id) => (
                  <li key={id}>
                    {keys[0][id]}: <span>{el}</span>
                  </li>
                )
              )}
            </ul>
            <ul>
              <li>
                Top Level Domain: <span>{topLevelDomain.join(", ")}</span>
              </li>
              <li>
                Currencies:{" "}
                <span>
                  {currencies
                    .map(({ name, symbol }) => `${name} (${symbol})`)
                    .join(", ")}
                </span>
              </li>
              <li>
                Languages:{" "}
                <span>{languages.map(({ name }) => name).join(", ")}</span>
              </li>
            </ul>
          </div>
          {borders.length > 0 && (
            <div className={s.border}>
              <p>Border Countries:</p>
              <div className={s.buttons}>
                {borders.map((border, id) => (
                  <div key={id}>
                    {/* @ts-expect-error Server Component */}
                    <Border border={border} getCountry={getCountry} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default Country;
