"use client";

import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import s from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className={s.section}>
      <h2>This page does not exist</h2>
      <Link
        href="/"
        aria-label="link to main page"
        className={s.btn}
        onClick={() => reset()}
      >
        <BsArrowLeft />
        Back
      </Link>
    </section>
  );
}
