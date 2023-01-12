import Link from "next/link";
import { CountryObj } from "./countries";

import s from "./country.module.scss";

const Country = ({ data }: { data: CountryObj }) => {
  return (
    <Link
      className={s.country}
      href={`/${data.alpha3Code.toLowerCase()}`}
      aria-label={data.name}
      role="article"
    >
      <picture className={s.img}>
        <img src={data.flag} alt={data.name} />
      </picture>
      <div className={s.body}>
        <h4>{data.name}</h4>
        <ul>
          <li>
            Population: <span>{data.population}</span>
          </li>
          <li>
            Region: <span>{data.region}</span>
          </li>
          <li>
            Capital: <span>{data.capital}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default Country;
