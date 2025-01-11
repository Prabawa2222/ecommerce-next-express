"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import useMeasure from "react-use-measure";
import { HEADLINE_IMAGES } from "./constant";

export default function HeroHeadline() {
  const section = useRef<HTMLTableSectionElement>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const [ref, { width }] = useMeasure();
  const [refContainer, { width: widthContainer }] = useMeasure();

  // Memoized transforms to avoid recalculating
  const carouselContainer = useScroll({
    target: carousel,
  });
  const xcarousel = useTransform(
    carouselContainer.scrollYProgress,
    [0, 1],
    useMemo(() => [0, -(width - widthContainer)], [width, widthContainer])
  );

  const sectionContainer = useScroll({
    target: section,
    offset: ["start center", "end center"],
  });
  const headingTextOpacity = useTransform(
    sectionContainer.scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const headingTextZindex = useTransform(
    sectionContainer.scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 0, 10, 10, 10, -50]
  );

  return (
    <section ref={section} className="min-h-screen py-12 px-6 relative">
      <div
        ref={refContainer}
        className="flex flex-col items-center justify-center gap-12"
      >
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0 }}
          style={{
            zIndex: headingTextZindex,
            opacity: headingTextOpacity,
          }}
          className="flex flex-col w-full h-full justify-center items-center gap-4 fixed top-0"
        >
          <p className="uppercase text-sm">Welcome To</p>
          <h1 className="uppercase text-[44px] font-bold">Eh-Commerce</h1>
        </motion.div>

        {/* Carousel Section */}
        <motion.div ref={carousel} className="h-[300vh] w-full">
          <div className="sticky top-0 overflow-hidden">
            <motion.div
              ref={ref}
              className="flex items-center justify-start gap-6 h-[100vh] w-max"
              style={{
                x: xcarousel,
              }}
            >
              {HEADLINE_IMAGES.map((imgsrc, idx) => (
                <motion.div
                  key={imgsrc}
                  initial={{ opacity: 0, y: 150 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true, amount: 0.3 }} // Optimize visibility checks
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="relative h-[750px] w-[500px] overflow-hidden rounded-md shadow-lg shrink-0"
                >
                  <Image
                    src={imgsrc}
                    alt={`Image Showcase ${idx + 1}`}
                    fill
                    className="object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-12 h-1 bg-brand-white-200/50 mb-4 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
