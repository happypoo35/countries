import Loader from "@public/loader.svg";

import s from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={s.loader}>
      <Loader />
    </div>
  );
};

export default Loading;
