"use client";

import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@hooks";
import { setQueryPage } from "rtk/query.slice";

import s from "./pageLoader.module.scss";

const PageLoader = ({ nHits }: { nHits: number }) => {
  const ref = useRef(null);
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;
    const stableRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1, rootMargin: "200px" }
    );

    observer.observe(stableRef);
    return () => observer.unobserve(stableRef);
  }, []);

  useEffect(() => {
    if (page !== 1) {
      dispatch(setQueryPage(page));
    }
  }, [page, dispatch]);

  return (
    <div
      className={s.loader}
      data-visible={page * 12 < nHits || undefined}
      ref={ref}
    >
      Loading countries...
    </div>
  );
};
export default PageLoader;
