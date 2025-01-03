/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function LocomotiveScroll({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <div>{children}</div>;
}
