import { Suspense } from "react";
import { Countries, CountriesSkeleton, Filters } from "@/components";

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
