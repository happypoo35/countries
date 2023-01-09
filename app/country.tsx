import Image from "next/image";
import Link from "next/link";
import { CountryObj } from "./countries";

import s from "./country.module.scss";

const Country = ({ data }: { data: CountryObj }) => {
  return (
    // <Link href={`/country/${data.name}`} aria-label={data.name}>
    <article className={s.country} aria-label={data.name}>
      <picture className={s.img}>
        <img src={data.flag} alt={data.name} />
      </picture>
      <div className={s.body}>
        <h4>{data.name}</h4>
        <ul>
          <li>
            <p>
              Population: <span>{data.population.toLocaleString()}</span>
            </p>
          </li>
          <li>
            <p>
              Region: <span>{data.region}</span>
            </p>
          </li>
          <li>
            <p>
              Capital: <span>{data.capital}</span>
            </p>
          </li>
        </ul>
      </div>
    </article>
    // </Link>
  );
};

export default Country;
