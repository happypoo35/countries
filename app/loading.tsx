import Loader from "@public/loader.svg";
import CountriesSkeleton from "./countriesSkeleton";

import s from "./loading.module.scss";

// const Loading = () => {
//   return <CountriesSkeleton />;
// };
const Loading = () => {
  return (
    <div className={s.loader}>
      <Loader />
    </div>
  );
};

export default Loading;
