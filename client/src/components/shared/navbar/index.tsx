"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  CustomDrawerContent,
  Drawer,
  DrawerClose,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SearchIcon, X } from "lucide-react";
import Link from "next/link";
import Icons from "../icons";
import MaxWidthWrapper from "../max-width-wrapper";
import SearchBox from "../search-box";
import { NAVLINK } from "./constant";

export default function Navbar() {
  return (
    <nav className="bg-transparent relative">
      {/* Logo */}
      <div className="absolute flex justify-center items-center inset-0 cursor-pointer">
        <Icons.Logo className="z-40" />
      </div>
      <MaxWidthWrapper className="py-7 z-20 relative">
        <div className="flex justify-between">
          {/* Burger Menu */}
          <Drawer direction="left">
            <DrawerTrigger>
              <Icons.Burger />
            </DrawerTrigger>
            <CustomDrawerContent className="h-full max-w-[350px] bg-brand-black-800 border-none text-brand-white-200 p-0">
              <DrawerHeader className="p-0">
                <div className="flex w-full items-center justify-between py-7 px-8 border-b-[0.5px] border-zinc-800">
                  <DialogTitle className="uppercase font-semibold">
                    Menu
                  </DialogTitle>
                  <DrawerClose>
                    <X className="font-extralight" />
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <div className="py-5 px-8">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-[10px]"
                >
                  {NAVLINK.map((item, idx) => (
                    <div key={idx}>
                      {item.type === "normal" && (
                        <AccordionItem className="py-4" value={item.display}>
                          <Link href={item.href} className="uppercase">
                            {item.display}
                          </Link>
                        </AccordionItem>
                      )}

                      {item.type === "collapsable" && (
                        <AccordionItem
                          className="py-4"
                          value={item.triggerDisplay}
                        >
                          <AccordionTrigger className="uppercase text-base font-normal p-0 !no-underline">
                            {item.triggerDisplay}
                          </AccordionTrigger>
                          {item.childs.map((itemchild, idx) => (
                            <AccordionContent
                              key={idx}
                              className={cn(
                                "pb-4 pl-4 mt-[10px] border-b-[0.5px] border-zinc-800",
                                {
                                  "mt-6": idx === 0,
                                },
                                {
                                  "border-none": idx === item.childs.length - 1,
                                }
                              )}
                            >
                              <Link href={itemchild.href} className="font-bold">
                                {itemchild.display}
                              </Link>
                            </AccordionContent>
                          ))}
                        </AccordionItem>
                      )}
                    </div>
                  ))}
                </Accordion>
              </div>
            </CustomDrawerContent>
          </Drawer>

          <div className="flex justify-center gap-4">
            {/* Search */}
            <div>
              <Dialog>
                <DialogTrigger>
                  <SearchIcon className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="bg-brand-black-800 text-brand-white-200 border-none rounded-none sm:rounded-none p-0 top-[30%]">
                  <DialogTitle className="hidden"></DialogTitle>
                  <SearchBox />
                </DialogContent>
              </Dialog>
            </div>
            {/* User */}
            [USER]
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
