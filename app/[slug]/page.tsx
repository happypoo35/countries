const Country = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  console.log(slug);

  return <div>Country page</div>;
};

export default Country;
