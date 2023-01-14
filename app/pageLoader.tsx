"use client";

import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { selectPage, setQueryPage } from "rtk/query.slice";

import s from "./pageLoader.module.scss";

const PageLoader = ({ nHits }: { nHits: number }) => {
  const ref = useRef(null);
  const currentPage = useAppSelector(selectPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;
    const stableRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch(setQueryPage(currentPage + 1));
        }
      },
      { threshold: 1, rootMargin: "200px" }
    );

    observer.observe(stableRef);
    return () => observer.unobserve(stableRef);
  }, [dispatch, currentPage]);

  return (
    <div
      className={s.loader}
      data-visible={currentPage * 12 < nHits || undefined}
      ref={ref}
    >
      Loading countries...
    </div>
  );
};
export default PageLoader;
