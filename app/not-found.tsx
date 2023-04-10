import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import s from "./not-found.module.scss";

const NotFound = () => {
  return (
    <section className={s.section}>
      <h2>This page does not exist</h2>
      <Link href="/" aria-label="link to main page" className={s.btn}>
        <BsArrowLeft />
        Back
      </Link>
    </section>
  );
};

export default NotFound;
