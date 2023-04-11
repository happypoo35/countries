import Link from "next/link";
import countriesData from "@/public/data.json";

import s from "./border.module.scss";

const getBorder = async (code: string) => {
  const country = countriesData.find(
    (el) => el.alpha3Code.toLowerCase() === code.toLowerCase()
  );
  if (!country) return;

  return {
    name: country.name,
    flag: country.flag,
  };
};

const Border = async ({ border }: { border: string }) => {
  const country = await getBorder(border);

  if (!country) return;

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
