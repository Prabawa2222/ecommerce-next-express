"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroVideo() {
  const container = useRef<HTMLTableSectionElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "95vh"]);
  const opacity = useTransform(scrollYProgress, [0, 1], ["100%", "10%"]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 3]);

  return (
    <section
      ref={container}
      className="relative h-screen overflow-hidden w-full"
    >
      <motion.video
        className="absolute object-cover inset-0 h-screen w-full"
        src="/hero-video.mp4"
        autoPlay={false}
        loop
        muted
        style={{
          y: y,
          opacity: opacity,
          scale: scale2,
        }}
      />
    </section>
  );
}
