"use client";

import { useState, useEffect } from "react";
import { CountryObj } from "./countries";
import Country from "./country";

const CountriesList = ({ countries }: { countries: CountryObj[] }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      {countries.slice(0, 12).map((el, id) => (
        <Country key={id} data={el} />
      ))}
    </>
  );
};

export default CountriesList;
