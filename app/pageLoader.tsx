"use client";

import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@hooks";
import { setQueryPage } from "rtk/query.slice";

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
      { threshold: 1, rootMargin: "400px" }
    );

    observer.observe(stableRef);
    return () => observer.unobserve(stableRef);
  }, []);

  useEffect(() => {
    if (page !== 1) {
      dispatch(setQueryPage(String(page)));
    }
  }, [page, dispatch]);

  return (
    <div style={{ paddingBlock: "2rem" }}>
      <h1 ref={ref}>Loading countries...</h1>
    </div>
  );
};
export default PageLoader;
