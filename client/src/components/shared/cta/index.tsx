"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMeasure from "react-use-measure";
import { z } from "zod";
import MaxWidthWrapper from "../max-width-wrapper";

type Props = {
  images: string[];
  imgwidth: number;
  imgheight: number;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email address",
  }),
});

export default function CTA({ images, imgwidth, imgheight }: Props) {
  const imageList = [...images, ...images];
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  useEffect(() => {
    const finalposition = -width;
    const controls = animate(xTranslation, [0, finalposition], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO:
    console.log(values);
  }

  return (
    <MaxWidthWrapper className="h-[40rem] py-12 px-6 relative">
      <div ref={ref} className="relative w-full overflow-hidden h-full">
        <motion.div
          className="absolute inset-0 flex items-center"
          style={{
            width: width * 2,
            x: xTranslation,
          }}
        >
          {imageList.map((imgsrc, idx) => (
            <div key={idx} className="relative h-full w-full overflow-hidden">
              <Image
                src={imgsrc}
                alt="bg-image"
                // height={imgheight}
                // width={imgwidth}
                fill
                style={{
                  minWidth: imgwidth / 2,
                  minHeight: imgheight / 2,
                }}
                className="object-fill"
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-black-900 via-brand-black-900/30 to-brand-black-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black-900 via-brand-black-900/30 to-brand-black-900" />

        <div className="relative flex flex-col w-full h-full justify-center items-center gap-4 max-w-screen-sm mx-auto text-center z-20">
          <h1 className="uppercase text-[44px] font-bold bg-gradient-to-b from-[#545454] to-[#c8c8c8e2] bg-clip-text text-transparent">
            <span>Discover Style Just</span>
            <br />
            <span>a Button Press Away!</span>
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full px-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type={"email"}
                        placeholder="Enter your email here"
                        className="flex w-full rounded-sm bg-brand-black-800 p-3 h-[46px] text-sm shadow-sm text-center transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-3 w-full p-3 h-[46px] text-base font-bold text-brand-black-800 rounded-sm bg-[#c8c8c8] hover:text-brand-black-800 hover:bg-[#c8c8c8] hover:opacity-95"
              >
                Subscribe
              </Button>
            </form>
          </Form>

          <p className="uppercase text-xs text-[#676767] tracking-wider">
            Instantly access the latest fashion trends and exclusive deals on
            our site. Discover your perfect style in a few clicks
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
