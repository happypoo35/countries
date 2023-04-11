import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import countriesData from "@/public/data.json";
import { Border } from "@/components";

import s from "./page.module.scss";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const country = getCountry(params.slug);

  if (!country) return;

  return {
    title: `Countries: ${country.name}`,
    description: `${country.name} details`,
    openGraph: {
      type: "website",
      title: `Countries: ${country.name}`,
      description: `${country.name} details`,
      siteName: "Countries",
      images: { url: country.flags.png, width: 1200, height: 630 },
      locale: "en-US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Countries: ${country.name}`,
      description: `${country.name} details`,
      images: { url: country.flags.png, width: 1200, height: 630 },
    },
  };
};

export const generateStaticParams = () => {
  return countriesData.map((country) => ({
    slug: country.alpha3Code.toLowerCase(),
  }));
};

const getCountry = (slug: string) => {
  const country = countriesData.find(
    (el) => el.alpha3Code.toLowerCase() === slug
  );

  if (!country) return;

  return {
    name: country.name,
    flag: country.flag,
    flags: country.flags,
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

const Country = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const country = getCountry(slug);

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
