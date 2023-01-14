import { getCountry } from "./page";

export default async function Head({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const country = await getCountry(slug);

  return (
    <>
      <title>{`Countries: ${
        country?.name ? ` ${country?.name}` : "Page not found"
      }`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          country?.name ? `Country details: ${country?.name}` : "Page not found"
        }
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
