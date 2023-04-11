import Link from "next/link";
import { CountryObj } from "@/app/page";

import s from "./country.module.scss";

const Country = ({ data }: { data: CountryObj[number] }) => (
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
      <h2>{data.name}</h2>
      <ul>
        <li>
          Population: <span>{data.population}</span>
        </li>
        <li>
          Region: <span>{data.region}</span>
        </li>
        {data.capital && (
          <li>
            Capital: <span>{data.capital}</span>
          </li>
        )}
      </ul>
    </div>
  </Link>
);

export default Country;
