import { PiPants, PiShirtFolded, PiTShirt } from "react-icons/pi";
import { TbShoe } from "react-icons/tb";

type NavlinkType =
  | { type: "normal"; display: string; href: string }
  | {
      type: "collapsable";
      triggerDisplay: string;
      childs: {
        display: string;
        href: string;
      }[];
    };

export const NAVLINK: NavlinkType[] = [
  {
    type: "normal",
    display: "Home",
    href: "/",
  },
  {
    type: "collapsable",
    triggerDisplay: "Product",
    childs: [
      {
        display: "Jeans",
        href: "#",
      },
      {
        display: "Shirt",
        href: "#",
      },
      {
        display: "T-Shirt",
        href: "#",
      },
      {
        display: "Sneakers",
        href: "#",
      },
    ],
  },
  {
    type: "normal",
    display: "Faq",
    href: "/faq",
  },
];

export const CATEGORY_FILTER = [
  { name: "Jeans", value: "jeans" },
  { name: "Shirt", value: "shirt" },
  { name: "T-Shirt", value: "tshirt" },
  { name: "Sneakers", value: "sneakers" },
];

export const CATEGORY_FILTER_ICON_MAP = {
  jeans: PiPants,
  shirt: PiTShirt,
  tshirt: PiShirtFolded,
  sneakers: TbShoe,
};
