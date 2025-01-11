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
        display: "All Product",
        href: "/search?category=all-product",
      },
      {
        display: "Promo",
        href: "/search?category=promo",
      },
      {
        display: "Jeans",
        href: "/search?category=jeans",
      },
      {
        display: "Shirt",
        href: "/search?category=shirt",
      },
      {
        display: "T-Shirt",
        href: "/search?category=t-shirt",
      },
      {
        display: "Sneakers",
        href: "/search?category=sneaker",
      },
    ],
  },
  {
    type: "normal",
    display: "Faq",
    href: "/faq",
  },
  {
    type: "normal",
    display: "Contact",
    href: "/contact",
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
