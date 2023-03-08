import Link from "next/link";
// import { getCountry } from "./page";
import { FullCountryObj } from "./page";

import s from "./border.module.scss";

const Border = async ({
  border,
  getCountry,
}: {
  border: string;
  getCountry: (code: string) => Promise<FullCountryObj>;
}) => {
  const country = await getCountry(border);

  return (
    <Link href={`/${border.toLowerCase()}`} className={s.btn}>
      <picture>
        <img
          src={country?.flag}
          alt={`flag of ${country?.name}`}
          style={{ height: "0.875rem" }}
        />
      </picture>
      {country?.name}
    </Link>
  );
};

export default Border;
