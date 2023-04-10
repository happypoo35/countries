import { Suspense } from "react";
import Countries from "./countries";
import CountriesSkeleton from "./countriesSkeleton";
import Filters from "./filters";

const Home = ({ searchParams }: { searchParams: { s?: string } }) => (
  <>
    <Filters />
    <Suspense fallback={<CountriesSkeleton />}>
      {/* @ts-expect-error Server Component */}
      <Countries search={searchParams.s} />
    </Suspense>
  </>
);

export default Home;
