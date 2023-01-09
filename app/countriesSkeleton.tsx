import sSection from "./countries.module.scss";
import sCard from "./country.module.scss";

const CountriesSkeleton = () => {
  const data = new Array(12).fill(0);
  return (
    <section className={sSection.countries} aria-label="countries list loading">
      {data?.map((el, id) => (
        <article className={sCard.country} key={id}>
          <div className={sCard.img} data-skeleton />
          <div className={sCard.body}>
            <h4 data-skeleton>Loading...</h4>
            <ul>
              <li>
                <p data-skeleton>Loading...</p>
              </li>
              <li>
                <p data-skeleton>Loading...</p>
              </li>
              <li>
                <p data-skeleton>Loading...</p>
              </li>
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
};

export default CountriesSkeleton;
