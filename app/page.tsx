import { Suspense } from "react";
import Countries from "./countries";
import CountriesSkeleton from "./countriesSkeleton";
import Filters from "./filters";

import s from "./page.module.scss";

export default function Home({
  searchParams,
}: {
  searchParams: { s: string };
}) {
  return (
    <main className={s.main} data-container="fixed">
      <Filters />
      <Suspense key={searchParams.s} fallback={<CountriesSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <Countries search={searchParams.s} />
      </Suspense>
    </main>
  );
}
