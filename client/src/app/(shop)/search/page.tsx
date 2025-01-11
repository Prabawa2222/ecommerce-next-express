import CTA from "@/components/shared/cta";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import ProductCard from "@/components/shared/product-card";

import { formatslug } from "@/lib/utils";
import { notFound } from "next/navigation";
import SortBy from "./_components/sort-by";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const category = (await searchParams).category;
  if (!category || (category && typeof category !== "string")) {
    return notFound();
  }

  // TODO: GET products based on search params and filter

  const products = Array.from({ length: 10 }, (_, i) => (
    <ProductCard
      key={i}
      product={{
        name: "Sneakers White",
        badge: "full-stock",
        href: `/product/${1}`,
        images: [
          { src: "/product-sneaker-1.avif", alt: "Sneaker" },
          { src: "/product-sneaker-2.avif", alt: "Sneakers" },
        ],
        price: "$100.00",
      }}
    />
  ));
  return (
    <div>
      {/* slug */}
      <MaxWidthWrapper className="py-12 text-xs">
        <div className="flex gap-x-2">
          <span>Home</span>
          <span>/</span>
          <span className="font-bold">{formatslug(category!)}</span>
        </div>
      </MaxWidthWrapper>
      {/* Sorting */}
      <MaxWidthWrapper className="text-xs pb-6">
        <div className="flex justify-end items-center gap-x-2">
          <div>Sort By</div>
          <SortBy />
        </div>
      </MaxWidthWrapper>
      {/* Product Grid */}
      <MaxWidthWrapper className="pb-12">
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
          {products}
        </div>
      </MaxWidthWrapper>
      {/* CTA */}
      <CTA
        images={Array.from({ length: 4 }, () => "/cta-background.avif")}
        imgwidth={972}
        imgheight={1024}
      />
    </div>
  );
}
