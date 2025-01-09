"use client";
import { ReactNode, useEffect, useRef } from "react";

import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";

type Props = {
  content: ReactNode;
  contentWidth: number;
};

export default function Banner({ content, contentWidth }: Props) {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const finalPosition = -contentWidth;
    controlsRef.current = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controlsRef.current?.stop();
  }, [xTranslation, width, contentWidth]);

  // calculate necessary width
  const { newWidth, contents } = getContents(width, contentWidth, content);

  const handleMouseEnter = () => {
    controlsRef.current?.stop();
  };

  const handleMouseLeave = () => {
    const finalPosition = -contentWidth;
    controlsRef.current = animate(
      xTranslation,
      [xTranslation.get(), finalPosition],
      {
        ease: "linear",
        duration: 25,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      }
    );
  };

  return (
    <div
      ref={ref}
      className="fixed h-[30px] w-full bottom-0 overflow-hidden bg-brand-black-900 z-50"
    >
      <motion.div
        className="flex justify-center items-center w-full h-full tracking-tighter overflow-hidden"
        style={{
          width: newWidth,
          x: xTranslation,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {contents.map((content, idx) => (
          <div
            style={{ width: contentWidth }}
            className="overflow-hidden"
            key={idx}
          >
            {content}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function getContents(
  containerWidth: number,
  contentWidth: number,
  content: ReactNode
): { newWidth: number; contents: ReactNode[] } {
  if (contentWidth <= containerWidth + contentWidth) {
    let multiplier = 1;
    let sumContentWidth = contentWidth;

    while (sumContentWidth <= containerWidth + contentWidth) {
      if (sumContentWidth > containerWidth + contentWidth) break;
      sumContentWidth += contentWidth;
      multiplier += 1;
    }

    const result: ReactNode[] = [];
    for (let i = 0; i < multiplier; i++) {
      result.push(content);
    }
    return { newWidth: contentWidth * multiplier, contents: result };
  } else {
    return { newWidth: contentWidth * 2, contents: [content, content] };
  }
}
