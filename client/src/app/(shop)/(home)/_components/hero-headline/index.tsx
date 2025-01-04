"use client";

// import { motion, useScroll, useTransform } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { HEADLINE_IMAGES } from "./constant";

export default function HeroHeadline() {
  const section = useRef<HTMLTableSectionElement>(null);
  const carousel = useRef<HTMLDivElement>(null);

  const carouselContainer = useScroll({
    target: carousel,
  });
  const xcarousel = useTransform(
    carouselContainer.scrollYProgress,
    [0, 1],
    ["0%", "-150%"]
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

  console.log(headingTextOpacity);

  return (
    <section ref={section} className="min-h-screen py-12 px-6 relative">
      <div className="flex flex-col items-center justify-center gap-12">
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

        <motion.div ref={carousel} className="h-[300vh] w-full">
          <div className="sticky top-0 overflow-hidden">
            <motion.div
              className="relative flex items-center gap-6 h-[100vh]"
              style={{
                x: xcarousel,
              }}
            >
              {HEADLINE_IMAGES.map((imgsrc) => (
                <motion.div
                  initial={{ opacity: 0, y: 150 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  key={imgsrc}
                  className="relative h-[750px] w-[500px] overflow-hidden rounded-md shadow-lg shrink-0"
                >
                  <Image
                    src={imgsrc}
                    alt="Image Showcase"
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-0">
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
