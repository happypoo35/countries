import Link from "next/link";
import countriesData from "@/public/data.json";

import s from "./border.module.scss";

const getBorder = (code: string) => {
  const country = countriesData.find(
    (el) => el.alpha3Code.toLowerCase() === code.toLowerCase()
  );
  if (!country) return;

  return {
    name: country.name,
    flag: country.flag,
  };
};

const Border = ({ border }: { border: string }) => {
  const country = getBorder(border);

  if (!country) return null;

  return (
    <Link href={`/${border.toLowerCase()}`} className={s.btn}>
      <picture>
        <img src={country.flag} alt={`flag of ${country.name}`} />
      </picture>
      {country.name}
    </Link>
  );
};

export default Border;
