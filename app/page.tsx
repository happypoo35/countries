import { Suspense } from "react";
import Countries from "./countries";
import CountriesSkeleton from "./countriesSkeleton";
import Filters from "./filters";

export default function Home({
  searchParams,
}: {
  searchParams: { s?: string };
}) {
  return (
    <>
      <Filters />
      <Suspense fallback={<CountriesSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <Countries search={searchParams.s} />
      </Suspense>
    </>
  );
}
