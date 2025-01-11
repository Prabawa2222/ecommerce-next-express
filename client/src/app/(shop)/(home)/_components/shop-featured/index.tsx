import Carousel from "@/components/shared/carousel";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import ProductCard from "@/components/shared/product-card";
import Image from "next/image";
import Link from "next/link";

export default function ShopFeatured() {
  const products = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="px-3">
      <ProductCard
        product={{
          name: "Sneakers White",
          badge: "Out-Of-Stock",
          href: "/search?category=sneaker",
          images: [
            { src: "/product-sneaker-1.avif", alt: "Sneaker" },
            { src: "/product-sneaker-2.avif", alt: "Sneakers" },
          ],
          price: "$100.00",
          discountPercent: "50%",
          discountPrice: "$50.00",
        }}
      />
    </div>
  ));

  return (
    <div className="">
      <MaxWidthWrapper className="min-h-screen py-12 px-6 relative">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col w-full h-full justify-center items-center gap-4 max-w-screen-md text-center">
            <h1 className="uppercase text-[44px] font-bold">
              Elevating Your Style Game
            </h1>
            <p className="uppercase text-sm">
              Discover the Perfect Blend of Comfort and Trend with Our Exclusive
              Collection. Explore Deals on Jeans, Sneakers, and More!
            </p>
          </div>

          <div className="relative w-full flex items-center justify-center">
            <div className="grid grid-cols-3 grid-rows-12 gap-6 h-[80vh] w-full">
              <div className="row-start-1 row-end-8 relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">Jeans</h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Style and comfort meet in our collection of jeans.
                      Discover the latest trends and perfect cuts for an
                      impeccable look.
                    </p>
                    <div className="relative">
                      <Image
                        src={"/featured-shop-jeans.avif"}
                        alt="Jeans"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-start-8 row-span-full relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">Shirts</h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Style and comfort meet in our collection of shirt.
                      Discover the latest trends and perfect cuts
                    </p>
                    <div className="relative">
                      <Image
                        src={"/featured-shop-shirt.avif"}
                        alt="Jeans"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-span-full col-start-2 relative border border-zinc-900 ">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[[#0a0a0a]] via-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.01]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="relative flex flex-col items-center py-12 px-10 gap-6 cursor-pointer h-full"
                  >
                    <div className="absolute -top-32">
                      <Image
                        src={"/featured-shop-promotion.avif"}
                        alt="Promotion"
                        className="object-cover -z-10 min-w-[350px] min-  h-[350px]"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="grow flex flex-col items-center justify-center gap-6 z-10">
                      <h4 className="uppercase text-[34px] font-bold">
                        Promotions
                      </h4>
                      <p className="text-sm text-center text-brand-white-200/70">
                        Explore exclusive deals on our top products. The perfect
                        opportunity to enrich your wardrobe with trendy pieces
                        at affordable prices.
                      </p>
                    </div>
                    <div className="absolute xl:-bottom-48 -bottom-32">
                      <Image
                        src={"/featured-shop-promotion.avif"}
                        alt="Promotion"
                        className="object-cover -z-10 min-w-[350px] min-h-[350px]"
                        width={450}
                        height={450}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-start-1 row-end-6 col-start-3 relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">
                      T-Shirts
                    </h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Style and comfort meet in our collection of tshirt.
                      Discover the latest trends and perfect cuts
                    </p>
                    <div className="relative -top-14">
                      <Image
                        src={"/featured-shop-tshirt.avif"}
                        alt="T-Shirts"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-start-6 row-span-full relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">
                      Sneakers
                    </h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Passion for fashion and comfort is reflected in every pair
                      of sneakers. Experience style and functionality in a
                      single step.
                    </p>
                    <div className="relative ">
                      <Image
                        src={"/featured-shop-sneaker.avif"}
                        alt="T-Shirts"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="min-h-screen py-12 px-6 relative">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col w-full h-full justify-center items-center gap-4 max-w-screen-md text-center">
            <h1 className="uppercase text-[44px] font-bold">Trending Now</h1>
            <p className="uppercase text-sm">
              Discover the Perfect Blend of Comfort and Trend with Our Exclusive
              Collection. Explore Deals on Jeans, Sneakers, and More!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-12">
            <Carousel items={products} />
            <Carousel items={products} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
