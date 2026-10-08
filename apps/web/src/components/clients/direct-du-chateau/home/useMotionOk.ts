"use client";

import { useEffect, useState } from "react";

export function useMotionOk(query = "(min-width: 900px)") {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const size = window.matchMedia(query);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOk(size.matches && !reduce.matches);
    update();
    size.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      size.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, [query]);

  return ok;
}
