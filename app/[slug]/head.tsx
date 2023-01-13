const getCountry = async (
  code: string
): Promise<{ name: string | undefined }> => {
  const res = await fetch(
    `https://restcountries.com/v2/alpha/${code}?fullText=true&fields=name`
  );

  return res.json();
};

export default async function Head({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { name } = await getCountry(slug);

  return (
    <>
      <title>{`Countries${name ? ` ${name}` : ""}`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={name ? `Country details: ${name}` : "Page not found"}
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
