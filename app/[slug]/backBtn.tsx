"use client";

import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

import s from "./backBtn.module.scss";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button
      aria-label="previous page"
      className={s.btn}
      onClick={() => router.back()}
    >
      <BsArrowLeft />
      Back
    </button>
  );
};
export default BackBtn;
