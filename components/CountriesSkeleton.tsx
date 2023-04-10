import sSection from "./countriesList.module.scss";
import sCard from "./country.module.scss";

const CountriesSkeleton = () => (
  <section className={sSection.countries} aria-label="countries list loading">
    {new Array(12).fill("").map((el, id) => (
      <article className={sCard.country} key={id}>
        <div className={sCard.img} data-skeleton />
        <div className={sCard.body}>
          <h2 data-skeleton>Loading...</h2>
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

export default CountriesSkeleton;
