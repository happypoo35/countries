import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import countriesData from "@/public/data.json";
import { getCountries } from "@/components/Countries";
import { Border } from "@/components";

import s from "./page.module.scss";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const country = await getCountry(params.slug);

  return {
    title: `Countries: ${country ? `${country.name}` : "Page not found"}`,
    description: country
      ? `Country details: ${country.name}`
      : "Page not found",
    openGraph: {
      images: country?.flag,
    },
  };
};

export const generateStaticParams = async () => {
  const countries = await getCountries();

  return countries.map((country) => ({
    slug: country.alpha3Code,
  }));
};

const getCountry = async (code: string) => {
  const country = countriesData.find(
    (el) => el.alpha3Code.toLocaleLowerCase() === code
  );

  if (!country) return;

  return {
    name: country.name,
    flag: country.flag,
    borders: country.borders,
    alpha3Code: country.alpha3Code,
    detailsData: [
      [
        {
          key: "Native Name",
          value: country.nativeName,
        },
        {
          key: "Population",
          value: country.population.toLocaleString(),
        },
        {
          key: "Region",
          value: country.region,
        },
        {
          key: "Sub Region",
          value: country.subregion,
        },
        {
          key: "Capital",
          value: country.capital,
        },
      ],
      [
        {
          key: "Top Level Domain",
          value: country.topLevelDomain.join(", "),
        },
        {
          key: "Currencies",
          value: country.currencies
            ?.map(({ name, symbol }) => `${name} (${symbol})`)
            .join(", "),
        },
        {
          key: "Languages",
          value: country.languages.map(({ name }) => name).join(", "),
        },
      ],
    ],
  };
};

const Country = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const country = await getCountry(slug);

  if (!country) {
    notFound();
  }

  return (
    <section className={s.section} aria-label={`${country.name} details`}>
      <Link href="/" aria-label="previous page" className={s.btn}>
        <BsArrowLeft />
        Back
      </Link>
      <article className={s.container} aria-label={country.name}>
        <picture>
          <img src={country.flag} alt={country.name} />
        </picture>
        <div className={s.info}>
          <h2>{country.name}</h2>
          <div className={s.details}>
            {country.detailsData.map((group, id) => (
              <ul key={id}>
                {group.map(
                  (item, i) =>
                    item.value && (
                      <li key={i}>
                        {item.key}: <span>{item.value}</span>
                      </li>
                    )
                )}
              </ul>
            ))}
          </div>
          {country.borders && country.borders.length > 0 && (
            <div className={s.border}>
              <p>Border Countries:</p>
              <div className={s.buttons}>
                {country.borders?.map((border, id) => (
                  <div key={id}>
                    {/* @ts-expect-error Server Component */}
                    <Border border={border} />
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
